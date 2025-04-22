import emailjs from 'emailjs-com';

const EMAIL_CONFIG = {
    serviceId: 'service_j2k9f99',
    templateId: 'template_v7guzgt',
    userId: 'RWhBxIBZhORVk40Bp',
    receiverEmail: 'blubrdpirts@gmail.com'
};

export const sendEmail = async (medicationData) => {
    const emailParams = {
        to_name: 'User',
        from_name: 'DoseBuddy',
        message: formatEmailMessage(medicationData),
        reply_to: EMAIL_CONFIG.receiverEmail
    };

    try {
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceId,
            EMAIL_CONFIG.templateId,
            emailParams,
            EMAIL_CONFIG.userId
        );
        return { success: true, response };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error };
    }
};

function formatEmailMessage(medication) {
    return `
        Medication Update:
        Name: ${medication.name}
        Time: ${medication.hour}:${medication.minute.toString().padStart(2, '0')}
        Status: ${medication.dispensed ? 'Taken' : 'Missed'}
        Chamber: ${medication.chamber}
        ${medication.lastDispensed ? `Last Dispensed: ${medication.lastDispensed}` : ''}
    `;
}