/* Start gsb_wohngeldrechner2025 */
   
    

    

    /**
* @name gsb_wohngeldrechner25
* @version 0.0.1
* @author dhoppius & flbruegg
*
* @desc Wohngeldrechner für das Bundesministerium für Wohnen,Stadtentwicklung und Bauwesen
*
* @requires  {@link external:jQuery}
*
* @example
* Beispielaufruf (TODO)
*
*
* // TODO initial bei aufgeklappt
*/
"use strict";
gsb.makeGSBModule('gsb.wohngeldrechner2025', {
  init: function () {
    var base = this;
    base.initRentLevelMapping();
    if (base.makeAdditionalFields()) {
      $('.js-wohngeldrechner__householdMembers').find('input').on('input', base.updateAdditionalFields);
      $('.js-wohngeldrechner__housingbenefitRecipients').find('input').on('input', base.updateAdditionalFields);
      base.updateAdditionalFields();
    }
    base.$rent = $('[name=rent]');
    base.$rentlevel = $('[name=rentLevel]');
    base.$homeResident = $('[name=homeResident]').on('change', base, base.wohngeldrechnerHandleHouseholdMembers);
    base.$householdMembers = $('[name=householdMembers]');
    base.$housingbenefitRecipients = $('[name=housingbenefitRecipients]');
    base.$singleParent = $('[value=singleParent]');
    base.$childsupport = $('[name=childsupport]');
    base.$disabledHouseholdMembers = $('[name=disabledHouseholdMembers]');
    base.$result = $('[name=result]');
    base.$incomeMembers = [];
    for (let i = 1; i < 13; i++) {
      let $current = $(`#wohngeldrechner-additionalfield-${i}`);
      base.$incomeMembers.push({
        $income: $current.find(`[name=income]`),
        $pension: $current.find(`[value=pension]`),
        $deductions: $current.find(`[name=deductions]`),
        $incometax: $($current.find(`[name=incometax]`)[0]),
        $healthInsurance: $($current.find(`[name=incometax]`)[1]),
        $pensionInsurance: $($current.find(`[name=incometax]`)[2]),
        $workingUnderageChild: $($current.find('[value=workingUnderageChild]'))
      });
    }
    $(base.el).data('base', base);
    base.wohngeldrechnerHandleHouseholdMembers(base);
    $(base.el).on('submit', base.calculateWohngeld);

  },
  calculateWohngeld: function (event) {
    event.preventDefault();
    var base = $(event.target).data('base');
    const calc = base.options.calculationVariables;
    const totalHouseholdMembers = base.localizedParseInt(base.$householdMembers.val());
    const eligibleHouseholdMembers = base.localizedParseInt(base.$householdMembers.val()) - base.localizedParseInt(base.$housingbenefitRecipients.val());
    const rentLevel = base.$rentlevel.val();
    var monthlyTotalIncome = 0;
    for (var i = 0; i < eligibleHouseholdMembers; i++) {
      const value = base.$incomeMembers[i];
      const pension = value.$pension.is(":checked") ? value.$income.val() : 0;
      const percentageDeduction = 1 - 0.1 * value.$incometax.is(':checked') - 0.1 * value.$healthInsurance.is(':checked') - 0.1 * value.$pensionInsurance.is(':checked');
      const pensionDeduction = pension < 100 ? pension : base.min(100 + (pension - 100) * 0.3, calc.rentenAbzuege.regelbedarfsstufe1 * 0.5);
      const workingUnderageChild = value.$workingUnderageChild.is(':checked');
      const monthlyIncome = (base.localizedParseFloat(value.$income.val()) - base.localizedParseFloat(value.$deductions.val())) * percentageDeduction - pensionDeduction;
      monthlyTotalIncome += workingUnderageChild ? monthlyIncome < calc.erwerbstaetigeKinderFreibetrag ? 0 : monthlyIncome - calc.erwerbstaetigeKinderFreibetrag : monthlyIncome;
    }

    monthlyTotalIncome = monthlyTotalIncome - calc.behindertenPauschbetrag * base.$disabledHouseholdMembers.val() - base.$singleParent.is(':checked') * calc.alleinerziehendenPauschbetrag - base.localizedParseFloat(base.$childsupport.val());
    monthlyTotalIncome = base.max(monthlyTotalIncome, 0);

    let $totalHouseholdMembers = $('.js-wohngeldrechner__householdMembers');
    let $totalHouseholdMembersInput = $totalHouseholdMembers.find('input');

    if (totalHouseholdMembers === 0) {
      if ($totalHouseholdMembers.find('.formField .formError').length === 0) {
        $totalHouseholdMembers.find('.formField').prepend('<div class="formError">\n' +
        '            <span id="errorMsg-totalHouseholdNumbers">Pflichtfeld nicht ausgefüllt.</span>\n' +
        '          </div>');
      }

      $totalHouseholdMembersInput.attr('aria-describedby', 'errorMsg-totalHouseholdNumbers');
      $('html, body').animate({
        scrollTop: $totalHouseholdMembers.find('label').offset().top - 20
      }, 800);
      $totalHouseholdMembersInput.focus();
    } else {
      $totalHouseholdMembersInput.removeAttr('aria-describedby');
      $totalHouseholdMembers.find('.formField .formError').remove();

      const maximumValue = totalHouseholdMembers < 6 ? calc.hoechstbetrag[totalHouseholdMembers][rentLevel] + calc.klimakomponente[totalHouseholdMembers] : calc.hoechstbetrag[5][rentLevel] + calc.klimakomponente[totalHouseholdMembers] + calc.hoechstbetrag.mehrAlsFuenf[rentLevel] * (totalHouseholdMembers - 5);
      const rent = base.$homeResident.is(':checked') ? maximumValue : base.localizedParseFloat(base.$rent.val());
      const monthlyTotalExpenditure = (rent < maximumValue ? rent : maximumValue) * eligibleHouseholdMembers / totalHouseholdMembers;
      const a = calc.a[eligibleHouseholdMembers];
      const b = calc.b[eligibleHouseholdMembers];
      const c = calc.c[eligibleHouseholdMembers];
      const M = base.max(monthlyTotalExpenditure + calc.heizkostenEntlastung[totalHouseholdMembers] * eligibleHouseholdMembers / totalHouseholdMembers, calc.M[totalHouseholdMembers]);
      const Y = base.max(monthlyTotalIncome, calc.Y[eligibleHouseholdMembers]);
      //Fix rounding
      const massiveNumber = 100000000;
      const z1 = massiveNumber * a + massiveNumber * b * M + massiveNumber * c * Y;
      const z2 = z1 / massiveNumber * Y;
      const z3 = M - z2;
      const z4 = 1.15 * z3;
      const result = Math.round(z4);
      base.$result.val(result < 10 ? 0 : result);
      base.$result.focus();
    }
  },
  min: function (a, b) {
    return a < b ? a : b;
  },
  max: function (a, b) {
    return a < b ? b : a;
  },
  localizedParseFloat: function (str) {
    return isNaN(parseFloat(str)) ? 0 : parseFloat(str);
  },
  localizedParseInt: function (str) {
    return isNaN(parseInt(str)) ? 0 : parseInt(str);
  },
  makeAdditionalFields: function () {
    let base = this;
    let $additionalFields = $(base.options.selectors.additionalFields);
    let $additionalFieldTemplate = $(base.options.selectors.additionalFieldTemplate);
    if ($additionalFieldTemplate.length !== 1) {
      gsb.error('GSB_Wohngeldrechner: Kein Template oder mehrere Templates für zusätzliche Felder gefunden');
      return false;
    }
    base.additionalFieldTemplate = $additionalFieldTemplate[0].innerHTML;
    $additionalFieldTemplate.attr('hidden', 'true');
    for (let i = 1; i < 13; i++) {
      let field = document.createElement("div");
      field.innerHTML = base.additionalFieldTemplate.replaceAll('{NUMMER}', i);
      field.className = $additionalFieldTemplate[0].className;
      field.setAttribute('id', `wohngeldrechner-additionalfield-${i}`);
      field.setAttribute('role', 'group');
      field.setAttribute('aria-label', WOHNGELDRECHNER_HAUSHALTSMITGLIED_LABEL + ` ${i}`);
      $additionalFields.append(field);
      $(field).find('input').not('[type=hidden]').each(function (j) {
        $(this).attr('id', $(this).attr('id') + `${i}${j}`);
      }
      );
      $(field).find('label').each(function (j) {
        $(this).attr('for', $(this).attr('for') + `${i}${j}`);
      }
      );
    }
    $('#wohngeldrechner-additionalfield-1').addClass('js-wohngeldrechner__show');
    return true;
  },
  updateAdditionalFields: function (event) {
    var householdMembers = $('.js-wohngeldrechner__householdMembers').find('input').val();
    var housingbenefitRecipients = $('.js-wohngeldrechner__housingbenefitRecipients').find('input').val();
    for (var i = 1; i < 13; i++) {
      if (i <= householdMembers - housingbenefitRecipients) {
        $(`#wohngeldrechner-additionalfield-${i}`).addClass('js-wohngeldrechner__show');
      } else {
        $(`#wohngeldrechner-additionalfield-${i}`).removeClass('js-wohngeldrechner__show');
      }
    }
    if (householdMembers > 0) {
      $('.js-wohngeldrechner-hint').show();
    } else
    {
      $('.js-wohngeldrechner-hint').hide();
    }
  },
  initRentLevelMapping: function () {
    var base = this;
    const $rentLevelLink = $('.c-rentlevelmapping__link');
    base.rentLevelMappingMap = null;
    if ($rentLevelLink) {
      const asyncLink = $rentLevelLink.html();
      if (asyncLink !== "") {
        fetch(asyncLink).
        then((response) => response.json()).
        then((data) => base.initWohngeldrechnerZIPCodeMapper(data, base));
      }
    }
  },
  initWohngeldrechnerZIPCodeMapper: function initWohngeldrechnerZIPCodeMapper(rentLevelMappingJSON, base) {
    this.rentLevelMappingMap = new Map(Object.entries(rentLevelMappingJSON));
    $('.c-rentlevelmapping__zipcode, .c-rentlevelmapping__levels, .c-rentlevelmapping__town').data('base', base).find('input, select').data('base', base);
    $('.c-rentlevelmapping__zipcode, .c-rentlevelmapping__levels').addClass('js-is-active');
    $('.c-rentlevelmapping__zipcode').on('input', base.wohngeldrechnerZIPCodeListener);
    $('.c-rentlevelmapping__town').on('input', base.wohngeldrechnerTownListener);
  },
  wohngeldrechnerZIPCodeListener: function (event) {
    var base = $(event.target).data('base');
    const mapping = base.rentLevelMappingMap.get(event.target.value);
    if (mapping) {
      if (mapping.length > 2) {
        base.wohngeldrechnerAddTownSelector(mapping, base);
      } else {
        $('.c-rentlevelmapping__town').removeClass('js-is-active');
        base.wohngeldrechnerSetRentlevel(mapping[1]);
      }
    } else {
      $('.c-rentlevelmapping__town').removeClass('js-is-active');
    }
  },

  wohngeldrechnerHandleHouseholdMembers: function (base) {
    var base = base.data !== undefined ? base.data : base;
    var $rent = $('.js-wohngeldrechner__rent');
    if (base.$homeResident.is(":checked")) {
      base.$rent.attr("disabled", "disabled");
      $rent.addClass('js-is-active').find('input').trigger('input');
      $rent.find(".c-content-accordion button").attr("tabindex", "-1");
    } else {
      base.$rent.removeAttr("disabled");
      $rent.removeClass('js-is-active').find('input').trigger('input');
      $rent.find(".c-content-accordion button").removeAttr("tabindex");
    }
  },

  wohngeldrechnerAddTownSelector: function (mapping, base) {
    const $rentlevelTown = $('.c-rentlevelmapping__town');
    const $rentlevelTownSelector = $rentlevelTown.find('select');
    $rentlevelTown.addClass('js-is-active');
    $rentlevelTownSelector.empty();
    var concat = '';
    for (let i = 0; i < mapping.length; i = i + 2) {
      concat += `<option title="${mapping[i]}" value="${mapping[i + 1]}">${mapping[i]} (Stufe ${base.romanize(mapping[i + 1])})</option>`;
    }
    $rentlevelTownSelector.append(concat);
    $rentlevelTown.val(mapping[1]).trigger('input');
  },

  wohngeldrechnerTownListener: function (event) {
    var base = $(event.target).data('base');
    base.wohngeldrechnerSetRentlevel(event.target.value);
  },
  wohngeldrechnerSetRentlevel: function (value) {
    $('.c-rentlevelmapping__levels').find('input, select').val(value);
  },
  romanize: function romanize(num) {
    if (isNaN(num)) {
      return NaN;
    }
    var digits = String(+num).split(""),
      key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
      "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
      "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
      roman = "",
      i = 3;
    while (i--) {
      roman = (key[+digits.pop() + i * 10] || '') + roman;
    }
    return Array(+digits.join("") + 1).join("M") + roman;
  },
  defaultOptions: {
    currentNumberOfFields: 0,
    selectors: {
      additionalFieldTemplate: '.js-wohngeldrechner__additionalfieldtemplate',
      additionalFields: '.js-wohngeldrechner__additionalfields'
    },
    calculationVariables: {
      hoechstbetrag: {
        1: {
          1: 361,
          2: 408,
          3: 456,
          4: 511,
          5: 562,
          6: 615,
          7: 677
        },
        2: {
          1: 437,
          2: 493,
          3: 551,
          4: 619,
          5: 680,
          6: 745,
          7: 820
        },
        3: {
          1: 521,
          2: 587,
          3: 657,
          4: 737,
          5: 809,
          6: 887,
          7: 975
        },
        4: {
          1: 608,
          2: 686,
          3: 766,
          4: 858,
          5: 946,
          6: 1035,
          7: 1139
        },
        5: {
          1: 694,
          2: 782,
          3: 875,
          4: 982,
          5: 1080,
          6: 1183,
          7: 1302
        },
        mehrAlsFuenf: {
          1: 82,
          2: 94,
          3: 106,
          4: 119,
          5: 129,
          6: 149,
          7: 163
        }
      },
      klimakomponente: {
        1: 19.20,
        2: 24.80,
        3: 29.60,
        4: 34.40,
        5: 39.20,
        6: 44,
        7: 48.8,
        8: 53.6,
        9: 58.4,
        10: 63.2,
        11: 68,
        12: 72.8
      },
      heizkostenEntlastung: {
        1: 110.40,
        2: 142.60,
        3: 170.20,
        4: 197.80,
        5: 225.40,
        6: 253,
        7: 280.6,
        8: 308.2,
        9: 335.8,
        10: 363.4,
        11: 391,
        12: 418.6
      },
      rentenAbzuege: {
        regelbedarfsstufe1: 563
      },
      behindertenPauschbetrag: 150,
      alleinerziehendenPauschbetrag: 110,
      erwerbstaetigeKinderFreibetrag: 100,
      a: {
        1: 0.04,
        2: 0.03,
        3: 0.02,
        4: 0.01,
        5: 0,
        6: -0.01,
        7: -0.02,
        8: -0.03,
        9: -0.04,
        10: -0.06,
        11: -0.09,
        12: -0.12
      },
      b: {
        1: 0.0004797,
        2: 0.0003571,
        3: 0.0002917,
        4: 0.0002163,
        5: 0.0001907,
        6: 0.0001722,
        7: 0.0001592,
        8: 0.0001583,
        9: 0.0001376,
        10: 0.0001249,
        11: 0.0001141,
        12: 0.0001107
      },
      c: {
        1: 0.00004080,
        2: 0.00003040,
        3: 0.00002450,
        4: 0.00001760,
        5: 0.00001720,
        6: 0.00001660,
        7: 0.00001650,
        8: 0.00001650,
        9: 0.00001660,
        10: 0.00001660,
        11: 0.00001960,
        12: 0.00002210
      },
      M: {
        1: 54,
        2: 67,
        3: 79,
        4: 92,
        5: 103,
        6: 103,
        7: 115,
        8: 128,
        9: 140,
        10: 152,
        11: 187,
        12: 298
      },
      Y: {
        1: 396,
        2: 679,
        3: 906,
        4: 1132,
        5: 1358,
        6: 1585,
        7: 1811,
        8: 2037,
        9: 2264,
        10: 2490,
        11: 2717,
        12: 2943
      },
      additionalEurosPerMemberExceedingTwelve: 65
    }
  }
});

    

   