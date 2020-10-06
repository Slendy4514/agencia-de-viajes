const Testimonial = require('../models/Testimoniales');

exports.testimonios = async (req, res) => {
    const testimoniales = await Testimonial.findAll();
    res.render('testimonial', {
        pagina: 'Testimoniales',
        testimoniales
    })
}

exports.testimonioPost = async (req, res) => {
    let {nombre, correo, mensaje} = req.body;
    let errores = [];
    if(!nombre){
        errores.push({'mensaje' : 'Agrega tu nombre'}); 
    }
    if(!correo){
        errores.push({'mensaje' : 'Agrega tu correo'}); 
    }
    if(!mensaje){
        errores.push({'mensaje' : 'Agrega tu mensaje'}); 
    }

    if(errores.length > 0){
        const testimoniales = await Testimonial.findAll();
        res.render('testimonial', {
            errores,
            nombre,
            correo,
            mensaje
        });
    }else{
        Testimonial.create({
            nombre,
            correo,
            mensaje
        }).then(testimonial => res.redirect('/testimonial'))
        .catch(error => console.log(error));
    }
}