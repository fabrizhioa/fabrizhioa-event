function Verificar() {
    console.log('activo');
    const values = ['fabri', 'fabrizhio', 'kati', 'katiuska', 'k', 'f'];
    let name_one = document.getElementById('name_one').value.toLowerCase();
    let name_two = document.getElementById('name_two').value.toLowerCase();
    let contain2 = document.getElementById('extra-contain');
    let contain1 = document.getElementById('contain-vertical');

    if (
        values.includes(name_one) &&
        values.includes(name_two) &&
        name_one !== name_two
    ) {
        contain1.style.display = 'none';
        contain2.style.display = 'grid';
    } else if (values.includes(name_one) || values.includes(name_two)) {
        document.getElementById('result').innerHTML = 'en la vida';
    } else if (name_one === '' || name_two === '') {
        alert('No pueden estar vacios');
    } else {
        var ran = Math.random() * 100;
        document.getElementById('result').innerHTML =
            Math.trunc(ran).toString() + '%';
    }
}
