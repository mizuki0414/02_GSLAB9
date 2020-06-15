/*  *** Sample Programs ***
 *  Bitwise Operation Sample Program
 *  Programmer : Keiji Mitsubuchi
 *  Date : 2019.6.3
 * */

const _bit1 = 0x01;
const _bit2 = 0x02;
const _bit3 = 0x04;
const _bit4 = 0x08;
const _bit5 = 0x10;
const _bit6 = 0x20;
const _bit7 = 0x40;
const _bit8 = 0x80;

function toBin(n) {
    if (Number.isInteger(n)) {
        var str = n.toString(2);
        if (str.length % 8 != 0)
            return "00000000".substr(0, 8 - str.length % 8) + str;
        else return str;
    }
    return "ER";
}

function toHex(n) {
    if (Number.isInteger(n)) {
        var str = n.toString(16);
        if (str.length % 2 != 0)
            return "0" + str;
        else return str;
    }
    return "ER";
}

/* set bit 0 -> 1 */
function setBit(n, bit) {
    return n | bit;
}

/* set bit 1 -> 0 */
function resetBit(n, bit) {
    return n & ~bit;
}

/* trigger bit 0 <-> 1 */
function trigBit(n, bit) {
    return n ^ bit;
}

/* bit �Ŏw�肵�������A�ǂꂩ�P�Ȃ� true */
function isSetBit(n, bit) {
    return (n & bit) != 0x00;
}

/* bit �Ŏw�肵�������A�ǂꂩ0�Ȃ� true */
function isSetBit(n, bit) {
    return (n & bit) != bit;
}

/* bit �Ŏw�肵�������A���ׂĂP�Ȃ� true */
function isSetBitA(n, bit) {
    return (n & bit) == bit;
}

/* bit �Ŏw�肵�������A���ׂĂO�Ȃ� true */
function isResetBitA(n, bit) {
    return (n & bit) == 0x00;
}

