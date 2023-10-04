import { Router } from 'express'
import axios from 'axios'
import config from './../utils/config'
import { sendMail } from './../utils/mail'

const router = Router()

router.post('/sendMessage', async (req, res) => {
    if (
        !req.body ||
        !req.body.callback ||
        !req.body.nickname ||
        !req.body.email ||
        !req.body.country ||
        !req.body.message
    ) {
        return res.send({
            status: 400
        })
    }

    const data = await axios.post(
        'https://recaptcha.net/recaptcha/api/siteverify',
        {
            secret: config.secret,
            response: req.body.callback
        },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )

    if (data.data.success !== true) {
        return 403
    }

    try {
        await sendMail({
            from: config.mail.from,
            to: config.mail.to,
            subject: config.mail.subject,
            html: `
            <div>
                nickname: ${JSON.stringify(req.body.nickname)} <br />
                email: ${JSON.stringify(req.body.email)} <br />
                country: ${JSON.stringify(req.body.country)} <br />
                message: ${JSON.stringify(req.body.message)}
            </div>

            `
        })
    } catch (error) {}

    return res.send({
        status: 200
    })
})

export default router
