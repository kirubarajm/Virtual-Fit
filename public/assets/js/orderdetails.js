const options = {
  collar: {
    0: [
      ['SpreadEagleBack1.png', 'SpreadEagleFront1.png'],
      ['SpreadEagleBack2.png', 'SpreadEagleFront2.png'],
      ['SpreadEagleBack3.png', 'SpreadEagleFront3.png'],
      ['SpreadEagleBack4.png', 'SpreadEagleFront4.png'],
    ],
    1: [
      ['BandhgalaFront1.png'],
      ['BandhgalaFront2.png'],
      ['BandhgalaFront3.png'],
      ['BandhgalaFront4.png'],
    ],
  },

  cuff: {
    0:
              [
                ['SingleConvertibleCuff1.png', 'SingleConvertibleCuffButtons1.png'],
                ['SingleConvertibleCuff2.png', 'SingleConvertibleCuffButtons2.png'],
                ['SingleConvertibleCuff3.png', 'SingleConvertibleCuffButtons3.png'],
                ['SingleConvertibleCuff4.png', 'SingleConvertibleCuffButtons4.png'],
              ],

    1:
              [
                ['DoubleBondCuff1.png', 'DoubleBondCuffButtons1.png'],
                ['DoubleBondCuff2.png', 'DoubleBondCuffButtons2.png'],
                ['DoubleBondCuff3.png', 'DoubleBondCuffButtons3.png'],
                ['DoubleBondCuff4.png', 'DoubleBondCuffButtons4.png'],
              ],
  },

  sleeve: {
    0:
              [
                ['FullSleeves1.png'],
                ['FullSleeves2.png'],
                ['FullSleeves3.png'],
                ['FullSleeves4.png'],
              ],

    1:
              [
                ['RollUpSleeve1.png', 'RollUpCuff1.png'],
                ['RollUpSleeve2.png', 'RollUpCuff2.png'],
                ['RollUpSleeve3.png', 'RollUpCuff3.png'],
                ['RollUpSleeve4.png', 'RollUpCuff4.png'],
              ],
    2:
              [
                ['HalfSleeve1.png'],
                ['HalfSleeve2.png'],
                ['HalfSleeve3.png'],
                ['HalfSleeve4.png'],
              ],
  },

  pockets: {
    0:
              [
                [],
                [],
                [],
                [],
              ],
    1:
              [
                ['SingleAngled1.png'],
                ['SingleAngled2.png'],
                ['SingleAngled3.png'],
                ['SingleAngled4.png'],
              ],
    2:
              [
                ['SingleFlap1.png'],
                ['SingleFlap2.png'],
                ['SingleFlap3.png'],
                ['SingleFlap4.png'],
              ],
    3:
              [
                ['DoubleFlap1.png'],
                ['DoubleFlap2.png'],
                ['DoubleFlap3.png'],
                ['DoubleFlap4.png'],
              ],
  },

  twillthreading: {
    0:
              [
                ['RegularTwill1.png', 'RegularButtons1.png'],
                ['RegularTwill2.png', 'RegularButtons2.png'],
                ['RegularTwill3.png', 'RegularButtons3.png'],
                ['RegularTwill4.png', 'RegularButtons4.png'],
              ],
    1:
              [
                ['FrenchButtons1.png'],
                ['FrenchButtons2.png'],
                ['FrenchButtons3.png'],
                ['FrenchButtons4.png'],
              ],
    2:
              [
                ['ConcealedTwill1.png'],
                ['ConcealedTwill2.png'],
                ['ConcealedTwill3.png'],
                ['ConcealedTwill4.png'],
              ],
  },
};

const fixed = {
  body: [
    'Body1.png',
    'Body2.png',
    'Body3.png',
    'Body4.png',
  ],
  pattern: [
    'Pattern1.png',
    'Pattern2.png',
    'Pattern3.png',
    'Pattern4.png',
  ],
};


const onCustChange = () => {
  const materialType = $('#material').html();
  const pattern = $('#pattern').html();

  const collar = $('#collar').html();
  const cuff = $('#cuff').html();
  const sleeve = $('#sleeve').html();
  const pocket = $('#pockets').html();
  const twillthread = $('#twill').html();

  const imageArray = [];

  // imageArray.push(...options.collar[collar][pattern]);
  // imageArray.push(...options.cuff[cuff][pattern]);
  // imageArray.push(...options.sleeve[sleeve][pattern]);
  // imageArray.push(...options.pockets[pocket][pattern]);
  // imageArray.push(...options.twillthreading[twillthread][pattern]);
  // imageArray.push(fixed.body[pattern]);

  let htmlString = '';
  htmlString += `<img src="/assets/images/customization/${fixed.body[pattern]}" style="z-index:10" />`;

  options.collar[collar][pattern].forEach((imgPath) => {
    htmlString += `<img src="/assets/images/customization/${imgPath}" style="z-index:20" />`;
  });

  if (!parseInt(sleeve)) {
    options.cuff[cuff][pattern].forEach((imgPath) => {
      htmlString += `<img src="/assets/images/customization/${imgPath}" style="z-index:30" />`;
    });
  }

  options.sleeve[sleeve][pattern].forEach((imgPath) => {
    htmlString += `<img src="/assets/images/customization/${imgPath}" style="z-index:20" />`;
  });

  options.pockets[pocket][pattern].forEach((imgPath) => {
    htmlString += `<img src="/assets/images/customization/${imgPath}" style="z-index:20" />`;
  });

  options.twillthreading[twillthread][pattern].forEach((imgPath) => {
    htmlString += `<img src="/assets/images/customization/${imgPath}" style="z-index:40" />`;
  });


  // imageArray.forEach((imgPath) => {
  //   htmlString += `<img src="/assets/images/customization/${imgPath}" />`;
  // });
  $('#output-target').html(htmlString);
};


$(document).ready(() => {
//   $('select').on('click', () => {
//     $(this).parent('.select-box').toggleClass('open');
//   });
//   $(document).mouseup((e) => {
//     const container = $('.select-box');

  //     console.log(e.target);
  //     if (container.has(e.target).length === 0) {
  //       container.removeClass('open');
  //     }
  //   });


  $('select').on('change', () => {
    const selection = $(this).find('option:selected').text();
    const labelFor = $(this).attr('id');
    const label = $(`[for='${labelFor}']`);

    label.find('.label-desc').html(selection);
  });

  onCustChange();
});
