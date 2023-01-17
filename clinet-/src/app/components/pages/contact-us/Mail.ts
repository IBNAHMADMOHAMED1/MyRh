import emailjs from '@emailjs/browser';
interface data {
    name: string;
    email: string;
    message: string;
    telphone: string;
    msg_subject: string;
    user_telphone: string;
}


export default function sendEmail(data: data) {
    const user_name = data.name;
    const user_email = data.email;
    const message = data.message;
    const user_telphone = data.telphone;

    const template_params = {
        "Bonjour \n": "Nouveaux message de " + user_name + " \n",
        "email": user_email,
        "Contenu \n": message,
    }
    const newObject = {
        from_name: user_name,
        user_email: user_email,
        message: message,
        user_telphone: data.telphone,
        subject: data.msg_subject

    }

    const service_id = "service_3viem26";
    const template_id = "template_njh8ot7";

    emailjs.send(service_id, template_id, newObject,"mwjEQ5Pjj8AdLr19f")
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert("Votre message a été envoyé avec succès");
            window.location.href = "/";
            
        }
            , function (error) {
                alert("Le serveur ne répond pas");
                console.log('FAILED...', error);
            });   

}

