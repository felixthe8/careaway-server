function Security (securityQ1 , securityA1, securityQ2, securityA2, securityQ3, securityA3) {
    this.securityQ1 = securityQ1 || '';
    this.securityA1 = securityA1 || '';
    this.securityQ2 = securityQ2 || '';
    this.securityA2 = securityA2 || '';
    this.securityQ3 = securityQ3 || '';
    this.securityA3 = securityA3 || '';
}

module.exports = Security;