const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendContactEmail = async (name, email, organisation, enquiryType, message) => {
    const htmlContent = generateEmailHTML(name, email, organisation, enquiryType, message);
    
    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        replyTo: email,
        subject: `New Contact Form: ${enquiryType || 'General Enquiry'} - ${name}`,
        html: htmlContent,
        text: `
New Contact Form Submission

From: ${name}
Email: ${email}
Organisation: ${organisation || 'N/A'}
Enquiry Type: ${enquiryType || 'N/A'}

Message:
${message}

Submitted: ${new Date().toLocaleString('en-US')}
        `.trim()
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Email sending failed:', error);
        throw error;
    }
};

const generateEmailHTML = (name, email, organisation, enquiryType, message) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F9FAFB;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; background-color: #F9FAFB;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <!-- Main Container -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding: 48px 40px 32px 40px; background: linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%);">
                            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                                <tr>
                                    <td>
                                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 300; letter-spacing: -0.5px; line-height: 1.2;">
                                            New Contact Form<br/>
                                            <span style="font-weight: 500;">Submission</span>
                                        </h1>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            
                            <!-- From Section -->
                            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 32px;">
                                <tr>
                                    <td style="padding-bottom: 8px;">
                                        <p style="margin: 0; color: #9CA3AF; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">From</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p style="margin: 0 0 6px 0; color: #0A0A0A; font-size: 18px; font-weight: 600; line-height: 1.4;">${name}</p>
                                        <p style="margin: 0 0 4px 0;">
                                            <a href="mailto:${email}" style="color: #0A0A0A; font-size: 15px; text-decoration: none; border-bottom: 1px solid #E5E7EB; padding-bottom: 1px;">${email}</a>
                                        </p>
                                        ${organisation ? `<p style="margin: 0; color: #6B7280; font-size: 14px; font-style: italic;">${organisation}</p>` : ''}
                                    </td>
                                </tr>
                            </table>
                            
                            ${enquiryType ? `
                            <!-- Enquiry Type Section -->
                            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 32px; padding-top: 24px; border-top: 2px solid #F3F4F6;">
                                <tr>
                                    <td style="padding-bottom: 8px;">
                                        <p style="margin: 0; color: #9CA3AF; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Enquiry Type</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span style="display: inline-block; padding: 8px 16px; background-color: #F3F4F6; color: #0A0A0A; font-size: 14px; font-weight: 500; border-radius: 20px;">${enquiryType}</span>
                                    </td>
                                </tr>
                            </table>
                            ` : ''}
                            
                            <!-- Message Section -->
                            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; padding-top: 24px; border-top: 2px solid #F3F4F6;">
                                <tr>
                                    <td style="padding-bottom: 12px;">
                                        <p style="margin: 0; color: #9CA3AF; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Message</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style="background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%); padding: 24px; border-radius: 12px; border-left: 4px solid #0A0A0A;">
                                            <p style="margin: 0; color: #0A0A0A; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Timestamp -->
                            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 32px; padding-top: 24px; border-top: 2px solid #F3F4F6;">
                                <tr>
                                    <td>
                                        <p style="margin: 0; color: #9CA3AF; font-size: 12px; line-height: 1.5;">
                                            📅 Submitted on ${new Date().toLocaleDateString('en-US', { 
                                                weekday: 'long',
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric', 
                                                hour: '2-digit', 
                                                minute: '2-digit',
                                                timeZoneName: 'short'
                                            })}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 32px 40px; background-color: #F9FAFB; border-top: 1px solid #E5E7EB;">
                            <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%;">
                                <tr>
                                    <td>
                                        <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 13px; line-height: 1.6;">
                                            💡 <strong>Quick Action:</strong> Reply directly to this email to respond to ${name}.
                                        </p>
                                        <p style="margin: 0; color: #9CA3AF; font-size: 12px; line-height: 1.5;">
                                            This message was sent via the Opportunity Central contact form.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
                
                <!-- Footer Note -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin-top: 24px;">
                    <tr>
                        <td align="center">
                            <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
                                Opportunity Central | Empowering Leaders & Organizations
                            </p>
                        </td>
                    </tr>
                </table>
                
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
};

module.exports = { sendContactEmail };