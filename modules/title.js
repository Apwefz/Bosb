function console_title(x) {
    if (process.platform == 'win32') {
        process.title = x + " / Apwefz sms bomber";
    } else {
        process.stdout.write('\x1b]2;' + x + " / Apwefz sms bomber" + '\x1b\x5c');
    }
}

module.exports = console_title;
