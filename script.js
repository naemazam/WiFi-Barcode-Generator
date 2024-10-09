$(document).ready(function () {
    $('#wifi-form').submit(function (e) {
        e.preventDefault();

        const ssid = $('#ssid').val().trim();
        const password = $('#password').val().trim();
        const type = $('#type').val();
        const hidden = $('#hidden-ssid').is(':checked') ? 'true' : 'false';

        // Validate the SSID and Password
        if (!ssid) {
            alert('SSID cannot be empty!');
            return;
        }

        // Format for WiFi QR code including hidden SSID option
        let wifiString = `WIFI:S:${ssid};T:${type};`;
        if (password || type !== "") {
            wifiString += `P:${password};`;
        }
        if (hidden === 'true') {
            wifiString += `H:${hidden};`;
        }
        wifiString += ';';

        // Generate QR code
        $('#qr-container').show();
        $('#download-button').hide();

        QRCode.toCanvas(document.getElementById('qr-code'), wifiString, function (error) {
            if (error) console.error(error);
            console.log('QR code generated!');
            $('#download-button').show();
        });

        // Download QR Code functionality
        $('#download-button').off('click').on('click', function() {
            const canvas = document.getElementById('qr-code');
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'wifi-qrcode.png';
            link.click();
        });
    });

    // Toggle password visibility
    $('#toggle-password').click(function() {
        const passwordField = $('#password');
        const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', type);
        $(this).text(type === 'password' ? '👁️' : '🙈');
    });
});
