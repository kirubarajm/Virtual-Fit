
const modalDisplay = () => {
  if (!eval($('#measurementSet').text())) { $('#exampleModalLong').modal(); }
};

$('#exampleModalLong').on('hidden.bs.modal', () => {
  modalDisplay();
});

const roundOff = (n) => {
  const decimal = ((n * 10) % 3);
  if (decimal >= 7) {
    return Math.floor(n) + 1;
  } if (decimal >= 3) {
    return Math.floor(n) + 0.5;
  }
  return Math.floor(n);
};

$.ajax({
  url: 'http://localhost:3000/customer/getmeasurements',
  success: (data) => {
    console.log('TCL: data', data);
    let {
      shirtHeight, shoulder, hand, collar, chest, stomach, hip,
    } = data._doc;
    shirtHeight = roundOff(shirtHeight);
    shoulder = roundOff(shoulder);
    hand = roundOff(hand);
    collar = roundOff(collar);
    chest = roundOff(chest);
    stomach = roundOff(stomach);
    hip = roundOff(hip);
    $('#measurementTable tbody').append(`
    <tr>
      <th scope='row'>Your size</th>
      <td>${shirtHeight}</td>
      <td>${shoulder}</td>
      <td>${hand}</td>
      <td>${collar}</td>
      <td>${chest}</td>
      <td>${stomach}</td>
      <td>${hip}</td>
    </tr>      
    `);
    renderMannequin(shirtHeight, shoulder, hand, collar, chest, stomach, hip);
  },
});

modalDisplay();
