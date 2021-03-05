const chalk = require('chalk');
const Guerrilla = require('guerrillamail-api');

console.log(chalk.magentaBright('Starting Guerrilla Mail CLI...'));

const client = new Guerrilla({
    pollInterval: 20000
});

client.on('emailAddress', (details) => {
    client.pollStart();
    console.log(chalk`{magentaBright Email address assigned!\nYour temporary email address is:} {gray ${details.email_addr}}`);
    console.log(chalk`{magentaBright Your emailaddress alias is:} {gray ${details.alias}@guerrillamailblock.com}`);
    console.log(chalk.magentaBright('Listening for new incoming emails...'));
});

client.on('newEmail', (email) => {
    console.log(chalk.yellowBright('You have a new email!'));
    for(var prop in email){
        console.log(chalk.gray('---------------------'));
        console.log(chalk`{magentaBright From:} {gray ${email[prop].mail_from}}`);
        console.log(chalk`{magentaBright Received at:} {gray ${email[prop].mail_date}}`);
        console.log(chalk`{magentaBright Reply to:} {gray ${email[prop].reply_to}}`);
        console.log(chalk`{magentaBright Subject:} {gray ${email[prop].mail_subject}}`);
        console.log(chalk.gray('---------------------'));
        console.log(chalk.gray(`${email[prop].mail_body}`));
        client.delEmail(email[prop].mail_id).then( (response) => {
            console.log(chalk.magentaBright('Email message marked as readed!'));
        });
    }
});