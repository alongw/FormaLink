<script setup lang="ts">
// import here ...
import { RecaptchaV2, useRecaptcha } from 'vue3-recaptcha-v2'
import { sendMessage } from '@/apis'
import { reactive, ref } from 'vue'
defineOptions({
    name: 'HomePage'
})

const handleWidgetId = (widgetId: number) => {
    console.log('Widget ID: ', widgetId)
}
const handleErrorCalback = () => {
    console.log('Error callback')
}
const handleExpiredCallback = () => {
    console.log('Expired callback')
}
const handleLoadCallback = async (response: any) => {
    const res = await sendMessage(
        response,
        formData.nickname,
        formData.email,
        formData.country,
        formData.message
    )
    if (res.data.status === 400) {
        return throwErr('The form must be filled out completely')
    }
    if (res.data.status === 403) {
        return throwErr('Invalid verification, please try again')
    }
    if (res.data.status === 200) {
        return throwErr(
            'Your message has been submitted. If you do not receive an email reply within 24 hours, please resubmit or contact us through other channels.'
        )
    }
    console.log(res.data.status)
}

const formData = reactive({
    nickname: '',
    email: '',
    country: '',
    message: ''
})

const throwErr = (msg: string) => {
    errmsg.value = msg
    dialog.value = false
    err.value = true
}

const dialog = ref(false)
const lock = ref(false)
const err = ref(false)
const errmsg = ref('')
const handleDialog = (status: boolean) => {
    if (status === false) {
        lock.value = true
    }
    dialog.value = status
}

// code here ...
</script>
<template>
    <div class="main">
        <h1>Connect</h1>
        <div v-if="err">{{ errmsg }}</div>
        <div v-else>
            <form>
                <p>You can use this online form or other means to contact me.</p>
                <ul>
                    <li>
                        <h4>Nickname</h4>
                        <input
                            type="text"
                            placeholder="Your nickname"
                            v-model="formData.nickname"
                        />
                    </li>
                    <li>
                        <h4>Email</h4>
                        <input
                            type="text"
                            placeholder="Your email"
                            v-model="formData.email"
                        />
                    </li>
                    <li>
                        <h4>Country</h4>
                        <input
                            type="text"
                            placeholder="Your country"
                            v-model="formData.country"
                        />
                    </li>
                </ul>
                <li>
                    <h4>Message</h4>
                    <textarea
                        placeholder="Your message"
                        rows="5"
                        v-model="formData.message"
                    />
                </li>

                <button
                    type="button"
                    style="margin-top: 20px"
                    @click="handleDialog(true)"
                >
                    Send
                </button>
            </form>
        </div>
    </div>
    <div class="dialog" v-if="dialog">
        <div class="dialogbox">
            <RecaptchaV2
                @widget-id="handleWidgetId"
                @error-callback="handleErrorCalback"
                @expired-callback="handleExpiredCallback"
                @load-callback="handleLoadCallback"
                :key="Date.now()"
            />
            <p v-if="lock === true">
                Sorry, something went wrong, please reload the page
            </p>
            <div class="closebtn" @click="handleDialog(false)">X</div>
        </div>
    </div>
</template>

<style scoped lang="less">
.main {
    width: 100%;
    max-width: 700px;
    margin: auto;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    background-color: rgba(247, 252, 254, 0.5);
}

form {
    margin: 25px 0;
}

ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // flex: 1;
}

@media screen and (max-width: 680px) {
    li {
        width: 100%;
    }
}

.dialog {
    user-select: none;
    z-index: 99;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);

    .dialogbox {
        margin-top: -39px;
        position: relative;
        background-color: #dbd0e6;
        padding: 30px;
        border-radius: 5px;
    }

    .closebtn {
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
    }
}
</style>
