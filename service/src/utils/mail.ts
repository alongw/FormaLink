import { createTransport } from 'nodemailer'

import type Mail from 'nodemailer/lib/mailer'

import type SMTPTransport from 'nodemailer/lib/smtp-transport'

import config from './config'

// const mail = await getConfig('app', 'mail')

// export const transporter = nodemailer.createTransport(mail)

// export const sendMail = (config: {
//     from: string
//     to: string
//     subject: string
//     html: string
// }) => {
//     return transporter.sendMail(config)
// }

const transport = createTransport(config.mail)

export const sendMail = (
    mailOptions: Mail.Options
): Promise<SMTPTransport.SentMessageInfo> => {
    return new Promise((resolve, reject) => {
        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                return reject(err)
            }
            resolve(info)
        })
    })
}
