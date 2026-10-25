function checkMessage() {
    const message = document.getElementById("message").value.trim();
    const result = document.getElementById("result");

    if (!message) {
        result.textContent = "Please paste a message to check.";
        result.style.background = "#fff3cd";
        result.style.color = "#664d03";
        return;
    }

    const text = message.toLowerCase();
    const warnings = [];

    if (/\botp\b|one.time password|verification code/.test(text)) {
        warnings.push("Requests involving OTPs or verification codes.");
    }

    if (/password|pin number|login credentials/.test(text)) {
        warnings.push("Requests for passwords, PINs or login details.");
    }

    if (/urgent|immediately|act now|account will be blocked|expires today/.test(text)) {
        warnings.push("Urgent or threatening language.");
    }

    if (/send money|transfer money|pay now|claim your prize|you have won/.test(text)) {
        warnings.push("Unexpected payment or prize claims.");
    }

    if (/https?:\/\/|www\./i.test(message)) {
        warnings.push("Contains a web link. Verify the destination before opening it.");
    }

    result.style.background = "#fce8e6";
    result.style.color = "#7f1d1d";

    if (warnings.length > 0) {
        result.innerHTML = "<strong>Warning signs detected:</strong><ul>" +
            warnings.map(warning => "<li>" + warning + "</li>").join("") +
            "</ul><p>Do not share OTPs, passwords or money based on this message. Verify it through an official channel.</p>";
    } else {
        result.style.background = "#e8f5e9";
        result.style.color = "#1b5e20";
        result.innerHTML =
            "<strong>No listed warning signs detected.</strong>" +
            "<p>This does not mean the message is safe. Scams may use other tactics. Verify the sender independently.</p>";
    }
}

function showEmergency() {
    const emergency = document.getElementById("emergency");

    emergency.style.background = "#fff3cd";
    emergency.style.color = "#664d03";

    emergency.innerHTML = `
        <h3>Emergency Assistance</h3>
        <p>If you are in immediate danger, move to a safer place if possible and contact local emergency services.</p>
        <p><strong>India emergency number:</strong> 112</p>
        <p><strong>Women’s helpline:</strong> 181 (availability may vary by location).</p>
        <p>This demo does not send an alert or share your location.</p>
        <button onclick="prepareAlert()">Prepare an Alert</button>
        <div id="alertDraft"></div>
    `;
}

function prepareAlert() {
    const alertDraft = document.getElementById("alertDraft");

    alertDraft.innerHTML = `
        <label for="alertText">Your emergency message:</label>
        <textarea id="alertText">I need help. Please contact me.</textarea>
        <button onclick="showAlertPreview()">Preview Alert</button>
        <div id="alertPreview"></div>
    `;
}

function showAlertPreview() {
    const message = document.getElementById("alertText").value.trim();
    const preview = document.getElementById("alertPreview");

    preview.textContent = message
        ? "Alert preview: " + message + " — This is a preview only. No message has been sent."
        : "Please enter an emergency message.";

    preview.style.marginTop = "12px";
    preview.style.padding = "12px";
    preview.style.background = "#ffffff";
}