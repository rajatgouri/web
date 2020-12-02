import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CurrencyService {
  private currencies: any = {
    "USD": {
      "symbol": "$",
      "name": "US Dollar",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "USD",
      "namePlural": "US dollars"
    },
    "CAD": {
      "symbol": "CA$",
      "name": "Canadian Dollar",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "CAD",
      "namePlural": "Canadian dollars"
    },
    "EUR": {
      "symbol": "€",
      "name": "Euro",
      "symbolNative": "€",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "EUR",
      "namePlural": "euros"
    },
    "AED": {
      "symbol": "AED",
      "name": "United Arab Emirates Dirham",
      "symbolNative": "د.إ.‏",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "AED",
      "namePlural": "UAE dirhams"
    },
    "AFN": {
      "symbol": "Af",
      "name": "Afghan Afghani",
      "symbolNative": "؋",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "AFN",
      "namePlural": "Afghan Afghanis"
    },
    "ALL": {
      "symbol": "ALL",
      "name": "Albanian Lek",
      "symbolNative": "Lek",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "ALL",
      "namePlural": "Albanian lekë"
    },
    "AMD": {
      "symbol": "AMD",
      "name": "Armenian Dram",
      "symbolNative": "դր.",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "AMD",
      "namePlural": "Armenian drams"
    },
    "ANG": {
      "symbol": "ƒ",
      "name": "Netherlands Antillean guilder",
      "symbolNative": "ƒ",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "ANG",
      "namePlural": "Netherlands Antillean guilder"
    },
    "AOA": {
      "symbol": "Kz",
      "name": "Angolan Kwanza",
      "symbolNative": "Kz",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "AOA",
      "namePlural": "Angolan Kwanzas"
    },
    "ARS": {
      "symbol": "AR$",
      "name": "Argentine Peso",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "ARS",
      "namePlural": "Argentine pesos"
    },
    "AUD": {
      "symbol": "AU$",
      "name": "Australian Dollar",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "AUD",
      "namePlural": "Australian dollars"
    },
    "AZN": {
      "symbol": "man.",
      "name": "Azerbaijani Manat",
      "symbolNative": "ман.",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "AZN",
      "namePlural": "Azerbaijani manats"
    },
    "BAM": {
      "symbol": "KM",
      "name": "Bosnia-Herzegovina Convertible Mark",
      "symbolNative": "KM",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "BAM",
      "namePlural": "Bosnia-Herzegovina convertible marks"
    },
    "BDT": {
      "symbol": "Tk",
      "name": "Bangladeshi Taka",
      "symbolNative": "৳",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "BDT",
      "namePlural": "Bangladeshi takas"
    },
    "BGN": {
      "symbol": "BGN",
      "name": "Bulgarian Lev",
      "symbolNative": "лв.",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "BGN",
      "namePlural": "Bulgarian leva"
    },
    "BHD": {
      "symbol": "BD",
      "name": "Bahraini Dinar",
      "symbolNative": "د.ب.‏",
      "dicimalDigits": 3,
      "rounding": 0,
      "code": "BHD",
      "namePlural": "Bahraini dinars"
    },
    "BIF": {
      "symbol": "FBu",
      "name": "Burundian Franc",
      "symbolNative": "FBu",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "BIF",
      "namePlural": "Burundian francs"
    },
    "BND": {
      "symbol": "BN$",
      "name": "Brunei Dollar",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "BND",
      "namePlural": "Brunei dollars"
    },
    "BMD": {
      "symbol": "$",
      "name": "Bermudian Dollar",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "BMD",
      "namePlural": "Bermudian Dollar"
    },
    "BOB": {
      "symbol": "Bs",
      "name": "Bolivian Boliviano",
      "symbolNative": "Bs",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "BOB",
      "namePlural": "Bolivian bolivianos"
    },
    "BRL": {
      "symbol": "R$",
      "name": "Brazilian Real",
      "symbolNative": "R$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "BRL",
      "namePlural": "Brazilian reals"
    },
    "BTN": {
      "symbol": "Nu.",
      "name": "Bhutanese Ngultrum",
      "symbolNative": "Nu.",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "BTN",
      "namePlural": "Bhutanese Ngultrum"
    },
    "BWP": {
      "symbol": "BWP",
      "name": "Botswanan Pula",
      "symbolNative": "P",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "BWP",
      "namePlural": "Botswanan pulas"
    },
    "BYR": {
      "symbol": "BYR",
      "name": "Belarusian Ruble",
      "symbolNative": "BYR",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "BYR",
      "namePlural": "Belarusian rubles"
    },
    "BZD": {
      "symbol": "BZ$",
      "name": "Belize Dollar",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "BZD",
      "namePlural": "Belize dollars"
    },
    "CDF": {
      "symbol": "CDF",
      "name": "Congolese Franc",
      "symbolNative": "FrCD",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "CDF",
      "namePlural": "Congolese francs"
    },
    "CHF": {
      "symbol": "CHF",
      "name": "Swiss Franc",
      "symbolNative": "CHF",
      "dicimalDigits": 2,
      "rounding": 0.05,
      "code": "CHF",
      "namePlural": "Swiss francs"
    },
    "CLP": {
      "symbol": "CL$",
      "name": "Chilean Peso",
      "symbolNative": "$",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "CLP",
      "namePlural": "Chilean pesos"
    },
    "CNY": {
      "symbol": "CN¥",
      "name": "Chinese Yuan",
      "symbolNative": "CN¥",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "CNY",
      "namePlural": "Chinese yuan"
    },
    "COP": {
      "symbol": "CO$",
      "name": "Colombian Peso",
      "symbolNative": "$",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "COP",
      "namePlural": "Colombian pesos"
    },
    "CRC": {
      "symbol": "₡",
      "name": "Costa Rican Colón",
      "symbolNative": "₡",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "CRC",
      "namePlural": "Costa Rican colóns"
    },
    "CVE": {
      "symbol": "CV$",
      "name": "Cape Verdean Escudo",
      "symbolNative": "CV$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "CVE",
      "namePlural": "Cape Verdean escudos"
    },
    "CZK": {
      "symbol": "Kč",
      "name": "Czech Republic Koruna",
      "symbolNative": "Kč",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "CZK",
      "namePlural": "Czech Republic korunas"
    },
    "DJF": {
      "symbol": "Fdj",
      "name": "Djiboutian Franc",
      "symbolNative": "Fdj",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "DJF",
      "namePlural": "Djiboutian francs"
    },
    "DKK": {
      "symbol": "Dkr",
      "name": "Danish Krone",
      "symbolNative": "kr",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "DKK",
      "namePlural": "Danish kroner"
    },
    "DOP": {
      "symbol": "RD$",
      "name": "Dominican Peso",
      "symbolNative": "RD$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "DOP",
      "namePlural": "Dominican pesos"
    },
    "DZD": {
      "symbol": "DA",
      "name": "Algerian Dinar",
      "symbolNative": "د.ج.‏",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "DZD",
      "namePlural": "Algerian dinars"
    },
    "EEK": {
      "symbol": "Ekr",
      "name": "Estonian Kroon",
      "symbolNative": "kr",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "EEK",
      "namePlural": "Estonian kroons"
    },
    "EGP": {
      "symbol": "EGP",
      "name": "Egyptian Pound",
      "symbolNative": "ج.م.‏",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "EGP",
      "namePlural": "Egyptian pounds"
    },
    "ERN": {
      "symbol": "Nfk",
      "name": "Eritrean Nakfa",
      "symbolNative": "Nfk",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "ERN",
      "namePlural": "Eritrean nakfas"
    },
    "ETB": {
      "symbol": "Br",
      "name": "Ethiopian Birr",
      "symbolNative": "Br",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "ETB",
      "namePlural": "Ethiopian birrs"
    },
    "FKP": {
      "symbol": "£",
      "name": "Falkland Island Pound",
      "symbolNative": "£",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "FKP",
      "namePlural": "Falkland Island Pounds"
    },
    "GBP": {
      "symbol": "£",
      "name": "British Pound Sterling",
      "symbolNative": "£",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "GBP",
      "namePlural": "British pounds sterling"
    },
    "GEL": {
      "symbol": "GEL",
      "name": "Georgian Lari",
      "symbolNative": "GEL",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "GEL",
      "namePlural": "Georgian laris"
    },
    "GHS": {
      "symbol": "GH₵",
      "name": "Ghanaian Cedi",
      "symbolNative": "GH₵",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "GHS",
      "namePlural": "Ghanaian cedis"
    },
    "GIP": {
      "symbol": "£",
      "name": "Gibraltar Pound",
      "symbolNative": "£",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "GHS",
      "namePlural": "Gibraltar pound"
    },
    "GNF": {
      "symbol": "FG",
      "name": "Guinean Franc",
      "symbolNative": "FG",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "GNF",
      "namePlural": "Guinean francs"
    },
    "GTQ": {
      "symbol": "GTQ",
      "name": "Guatemalan Quetzal",
      "symbolNative": "Q",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "GTQ",
      "namePlural": "Guatemalan quetzals"
    },
    "HKD": {
      "symbol": "HK$",
      "name": "Hong Kong Dollar",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "HKD",
      "namePlural": "Hong Kong dollars"
    },
    "HNL": {
      "symbol": "HNL",
      "name": "Honduran Lempira",
      "symbolNative": "L",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "HNL",
      "namePlural": "Honduran lempiras"
    },
    "HRK": {
      "symbol": "kn",
      "name": "Croatian Kuna",
      "symbolNative": "kn",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "HRK",
      "namePlural": "Croatian kunas"
    },
    "HUF": {
      "symbol": "Ft",
      "name": "Hungarian Forint",
      "symbolNative": "Ft",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "HUF",
      "namePlural": "Hungarian forints"
    },
    "IDR": {
      "symbol": "Rp",
      "name": "Indonesian Rupiah",
      "symbolNative": "Rp",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "IDR",
      "namePlural": "Indonesian rupiahs"
    },
    "ILS": {
      "symbol": "₪",
      "name": "Israeli New Sheqel",
      "symbolNative": "₪",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "ILS",
      "namePlural": "Israeli new sheqels"
    },
    "INR": {
      "symbol": "Rs",
      "name": "Indian Rupee",
      "symbolNative": "টকা",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "INR",
      "namePlural": "Indian rupees"
    },
    "IQD": {
      "symbol": "IQD",
      "name": "Iraqi Dinar",
      "symbolNative": "د.ع.‏",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "IQD",
      "namePlural": "Iraqi dinars"
    },
    "IRR": {
      "symbol": "IRR",
      "name": "Iranian Rial",
      "symbolNative": "﷼",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "IRR",
      "namePlural": "Iranian rials"
    },
    "ISK": {
      "symbol": "Ikr",
      "name": "Icelandic Króna",
      "symbolNative": "kr",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "ISK",
      "namePlural": "Icelandic krónur"
    },
    "JMD": {
      "symbol": "J$",
      "name": "Jamaican Dollar",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "JMD",
      "namePlural": "Jamaican dollars"
    },
    "JOD": {
      "symbol": "JD",
      "name": "Jordanian Dinar",
      "symbolNative": "د.أ.‏",
      "dicimalDigits": 3,
      "rounding": 0,
      "code": "JOD",
      "namePlural": "Jordanian dinars"
    },
    "JPY": {
      "symbol": "¥",
      "name": "Japanese Yen",
      "symbolNative": "￥",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "JPY",
      "namePlural": "Japanese yen"
    },
    "KES": {
      "symbol": "с",
      "name": "Kyrgyzstani som",
      "symbolNative": "с",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "KES",
      "namePlural": "Kyrgyzstani som"
    },
    "KGS": {
      "symbol": "Ksh",
      "name": "Kyrgyzstani Som",
      "symbolNative": "Ksh",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "KES",
      "namePlural": "Kenyan shillings"
    },
    "KHR": {
      "symbol": "KHR",
      "name": "Cambodian Riel",
      "symbolNative": "៛",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "KHR",
      "namePlural": "Cambodian riels"
    },
    "KMF": {
      "symbol": "CF",
      "name": "Comorian Franc",
      "symbolNative": "FC",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "KMF",
      "namePlural": "Comorian francs"
    },
    "KRW": {
      "symbol": "₩",
      "name": "South Korean Won",
      "symbolNative": "₩",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "KRW",
      "namePlural": "South Korean won"
    },
    "KWD": {
      "symbol": "KD",
      "name": "Kuwaiti Dinar",
      "symbolNative": "د.ك.‏",
      "dicimalDigits": 3,
      "rounding": 0,
      "code": "KWD",
      "namePlural": "Kuwaiti dinars"
    },
    "KYD": {
      "symbol": "$",
      "name": "Cayman Islands dollar",
      "symbolNative": "$‏",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "KYD",
      "namePlural": "Cayman Islands dollarS"
    },
    "KZT": {
      "symbol": "KZT",
      "name": "Kazakhstani Tenge",
      "symbolNative": "тңг.",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "KZT",
      "namePlural": "Kazakhstani tenges"
    },
    "LAK": {
      "symbol": "₭",
      "name": "Lao kip",
      "symbolNative": "₭‏",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "LAK",
      "namePlural": "Lao kip"
    },
    "LBP": {
      "symbol": "LB£",
      "name": "Lebanese Pound",
      "symbolNative": "ل.ل.‏",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "LBP",
      "namePlural": "Lebanese pounds"
    },
    "LKR": {
      "symbol": "SLRs",
      "name": "Sri Lankan Rupee",
      "symbolNative": "SL Re",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "LKR",
      "namePlural": "Sri Lankan rupees"
    },
    "LRD": {
      "symbol": "$",
      "name": "Liberian Dollar",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "LRD",
      "namePlural": "Liberian Dollars"
    },
    "LTL": {
      "symbol": "Lt",
      "name": "Lithuanian Litas",
      "symbolNative": "Lt",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "LTL",
      "namePlural": "Lithuanian litai"
    },
    "LVL": {
      "symbol": "Ls",
      "name": "Latvian Lats",
      "symbolNative": "Ls",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "LVL",
      "namePlural": "Latvian lati"
    },
    "LYD": {
      "symbol": "LD",
      "name": "Libyan Dinar",
      "symbolNative": "د.ل.‏",
      "dicimalDigits": 3,
      "rounding": 0,
      "code": "LYD",
      "namePlural": "Libyan dinars"
    },
    "MAD": {
      "symbol": "MAD",
      "name": "Moroccan Dirham",
      "symbolNative": "د.م.‏",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "MAD",
      "namePlural": "Moroccan dirhams"
    },
    "MDL": {
      "symbol": "MDL",
      "name": "Moldovan Leu",
      "symbolNative": "MDL",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "MDL",
      "namePlural": "Moldovan lei"
    },
    "MGA": {
      "symbol": "MGA",
      "name": "Malagasy Ariary",
      "symbolNative": "MGA",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "MGA",
      "namePlural": "Malagasy Ariaries"
    },
    "MKD": {
      "symbol": "MKD",
      "name": "Macedonian Denar",
      "symbolNative": "MKD",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "MKD",
      "namePlural": "Macedonian denari"
    },
    "MMK": {
      "symbol": "MMK",
      "name": "Myanma Kyat",
      "symbolNative": "K",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "MMK",
      "namePlural": "Myanma kyats"
    },
    "MOP": {
      "symbol": "MOP$",
      "name": "Macanese Pataca",
      "symbolNative": "MOP$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "MOP",
      "namePlural": "Macanese patacas"
    },
    "MUR": {
      "symbol": "MURs",
      "name": "Mauritian Rupee",
      "symbolNative": "MURs",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "MUR",
      "namePlural": "Mauritian rupees"
    },
    "MWK": {
      "symbol": "MK",
      "name": "Malawian Kwacha",
      "symbolNative": "MK",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "MWK",
      "namePlural": "Malawian Kwacha"
    },
    "MXN": {
      "symbol": "MX$",
      "name": "Mexican Peso",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "MXN",
      "namePlural": "Mexican pesos"
    },
    "MYR": {
      "symbol": "RM",
      "name": "Malaysian Ringgit",
      "symbolNative": "RM",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "MYR",
      "namePlural": "Malaysian ringgits"
    },
    "MZN": {
      "symbol": "MTn",
      "name": "Mozambican Metical",
      "symbolNative": "MTn",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "MZN",
      "namePlural": "Mozambican meticals"
    },
    "NAD": {
      "symbol": "N$",
      "name": "Namibian Dollar",
      "symbolNative": "N$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "NAD",
      "namePlural": "Namibian dollars"
    },
    "NGN": {
      "symbol": "₦",
      "name": "Nigerian Naira",
      "symbolNative": "₦",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "NGN",
      "namePlural": "Nigerian nairas"
    },
    "NIO": {
      "symbol": "C$",
      "name": "Nicaraguan Córdoba",
      "symbolNative": "C$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "NIO",
      "namePlural": "Nicaraguan córdobas"
    },
    "NOK": {
      "symbol": "Nkr",
      "name": "Norwegian Krone",
      "symbolNative": "kr",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "NOK",
      "namePlural": "Norwegian kroner"
    },
    "NPR": {
      "symbol": "NPRs",
      "name": "Nepalese Rupee",
      "symbolNative": "नेरू",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "NPR",
      "namePlural": "Nepalese rupees"
    },
    "NZD": {
      "symbol": "NZ$",
      "name": "New Zealand Dollar",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "NZD",
      "namePlural": "New Zealand dollars"
    },
    "OMR": {
      "symbol": "OMR",
      "name": "Omani Rial",
      "symbolNative": "ر.ع.‏",
      "dicimalDigits": 3,
      "rounding": 0,
      "code": "OMR",
      "namePlural": "Omani rials"
    },
    "PAB": {
      "symbol": "B/.",
      "name": "Panamanian Balboa",
      "symbolNative": "B/.",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "PAB",
      "namePlural": "Panamanian balboas"
    },
    "PEN": {
      "symbol": "S/.",
      "name": "Peruvian Nuevo Sol",
      "symbolNative": "S/.",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "PEN",
      "namePlural": "Peruvian nuevos soles"
    },
    "PHP": {
      "symbol": "₱",
      "name": "Philippine Peso",
      "symbolNative": "₱",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "PHP",
      "namePlural": "Philippine pesos"
    },
    "PKR": {
      "symbol": "PKRs",
      "name": "Pakistani Rupee",
      "symbolNative": "₨",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "PKR",
      "namePlural": "Pakistani rupees"
    },
    "PLN": {
      "symbol": "zł",
      "name": "Polish Zloty",
      "symbolNative": "zł",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "PLN",
      "namePlural": "Polish zlotys"
    },
    "PYG": {
      "symbol": "₲",
      "name": "Paraguayan Guarani",
      "symbolNative": "₲",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "PYG",
      "namePlural": "Paraguayan guaranis"
    },
    "QAR": {
      "symbol": "QR",
      "name": "Qatari Rial",
      "symbolNative": "ر.ق.‏",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "QAR",
      "namePlural": "Qatari rials"
    },
    "RON": {
      "symbol": "RON",
      "name": "Romanian Leu",
      "symbolNative": "RON",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "RON",
      "namePlural": "Romanian lei"
    },
    "RSD": {
      "symbol": "din.",
      "name": "Serbian Dinar",
      "symbolNative": "дин.",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "RSD",
      "namePlural": "Serbian dinars"
    },
    "RUB": {
      "symbol": "RUB",
      "name": "Russian Ruble",
      "symbolNative": "руб.",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "RUB",
      "namePlural": "Russian rubles"
    },
    "RWF": {
      "symbol": "RWF",
      "name": "Rwandan Franc",
      "symbolNative": "FR",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "RWF",
      "namePlural": "Rwandan francs"
    },
    "SAR": {
      "symbol": "SR",
      "name": "Saudi Riyal",
      "symbolNative": "ر.س.‏",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "SAR",
      "namePlural": "Saudi riyals"
    },
    "SBD": {
      "symbol": "$",
      "name": "Solomon Islander Dollar",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "SBD",
      "namePlural": "Solomon Islander Dollars"
    },
    "SDG": {
      "symbol": "SDG",
      "name": "Sudanese Pound",
      "symbolNative": "SDG",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "SDG",
      "namePlural": "Sudanese pounds"
    },
    "SEK": {
      "symbol": "Skr",
      "name": "Swedish Krona",
      "symbolNative": "kr",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "SEK",
      "namePlural": "Swedish kronor"
    },
    "SGD": {
      "symbol": "S$",
      "name": "Singapore Dollar",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "SGD",
      "namePlural": "Singapore dollars"
    },
    "SLL": {
      "symbol": "Le",
      "name": "Sierra Leonean Leone",
      "symbolNative": "Le",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "SLL",
      "namePlural": "Sierra Leonean Leone"
    },
    "SOS": {
      "symbol": "Ssh",
      "name": "Somali Shilling",
      "symbolNative": "Ssh",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "SOS",
      "namePlural": "Somali shillings"
    },
    "SSP": {
      "symbol": "£",
      "name": "South Sudanese pound",
      "symbolNative": "£",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "SSP",
      "namePlural": "South Sudanese pound"
    },
    "STD": {
      "symbol": "Db",
      "name": "Sao Tomean Dobra",
      "symbolNative": "Db",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "STD",
      "namePlural": "Sao Tomean Dobra"
    },
    "STN": {
      "symbol": "Db",
      "name": "Sao Tomean Dobra",
      "symbolNative": "Db",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "STN",
      "namePlural": "Sao Tomean Dobra"
    },
    "SYP": {
      "symbol": "SY£",
      "name": "Syrian Pound",
      "symbolNative": "ل.س.‏",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "SYP",
      "namePlural": "Syrian pounds"
    },
    "SZL": {
      "symbol": "L",
      "name": "Swazi Lilangeni",
      "symbolNative": "L‏",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "SZL",
      "namePlural": "Swazi Lilangeni"
    },
    "THB": {
      "symbol": "฿",
      "name": "Thai Baht",
      "symbolNative": "฿",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "THB",
      "namePlural": "Thai baht"
    },
    "TJS": {
      "symbol": "ЅМ",
      "name": "Tajikistani Somoni",
      "symbolNative": "ЅМ",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "THB",
      "namePlural": "Tajikistani Somoni"
    },
    "TND": {
      "symbol": "DT",
      "name": "Tunisian Dinar",
      "symbolNative": "د.ت.‏",
      "dicimalDigits": 3,
      "rounding": 0,
      "code": "TND",
      "namePlural": "Tunisian dinars"
    },
    "TOP": {
      "symbol": "T$",
      "name": "Tongan Paʻanga",
      "symbolNative": "T$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "TOP",
      "namePlural": "Tongan paʻanga"
    },
    "TRY": {
      "symbol": "TL",
      "name": "Turkish Lira",
      "symbolNative": "TL",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "TRY",
      "namePlural": "Turkish Lira"
    },
    "TTD": {
      "symbol": "TT$",
      "name": "Trinidad and Tobago Dollar",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "TTD",
      "namePlural": "Trinidad and Tobago dollars"
    },
    "TWD": {
      "symbol": "NT$",
      "name": "New Taiwan Dollar",
      "symbolNative": "NT$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "TWD",
      "namePlural": "New Taiwan dollars"
    },
    "TZS": {
      "symbol": "TSh",
      "name": "Tanzanian Shilling",
      "symbolNative": "TSh",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "TZS",
      "namePlural": "Tanzanian shillings"
    },
    "UAH": {
      "symbol": "₴",
      "name": "Ukrainian Hryvnia",
      "symbolNative": "₴",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "UAH",
      "namePlural": "Ukrainian hryvnias"
    },
    "UGX": {
      "symbol": "USh",
      "name": "Ugandan Shilling",
      "symbolNative": "USh",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "UGX",
      "namePlural": "Ugandan shillings"
    },
    "UYU": {
      "symbol": "$U",
      "name": "Uruguayan Peso",
      "symbolNative": "$",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "UYU",
      "namePlural": "Uruguayan pesos"
    },
    "UZS": {
      "symbol": "UZS",
      "name": "Uzbekistan Som",
      "symbolNative": "UZS",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "UZS",
      "namePlural": "Uzbekistan som"
    },
    "VEF": {
      "symbol": "Bs.F.",
      "name": "Venezuelan Bolívar",
      "symbolNative": "Bs.F.",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "VEF",
      "namePlural": "Venezuelan bolívars"
    },
    "VND": {
      "symbol": "₫",
      "name": "Vietnamese Dong",
      "symbolNative": "₫",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "VND",
      "namePlural": "Vietnamese dong"
    },
    "VUV": {
      "symbol": "Vt",
      "name": "Ni-Vanuatu Vatu",
      "symbolNative": "Vt",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "VUV",
      "namePlural": "Ni-Vanuatu Vatu"
    },
    "XAF": {
      "symbol": "FCFA",
      "name": "CFA Franc BEAC",
      "symbolNative": "FCFA",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "XAF",
      "namePlural": "CFA francs BEAC"
    },
    "XCD": {
      "symbol": "$",
      "name": "East Caribbean Dollar",
      "symbolNative": "$",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "XCD",
      "namePlural": "East Caribbean Dollars"
    },
    "XOF": {
      "symbol": "CFA",
      "name": "CFA Franc BCEAO",
      "symbolNative": "CFA",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "XOF",
      "namePlural": "CFA francs BCEAO"
    },
    "XPF": {
      "symbol": "Fr",
      "name": "CFP franc",
      "symbolNative": "Fr",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "XPF",
      "namePlural": "CFP franc"
    },
    "YER": {
      "symbol": "YR",
      "name": "Yemeni Rial",
      "symbolNative": "ر.ي.‏",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "YER",
      "namePlural": "Yemeni rials"
    },
    "ZAR": {
      "symbol": "R",
      "name": "South African Rand",
      "symbolNative": "R",
      "dicimalDigits": 2,
      "rounding": 0,
      "code": "ZAR",
      "namePlural": "South African rand"
    },
    "ZMK": {
      "symbol": "ZK",
      "name": "Zambian Kwacha",
      "symbolNative": "ZK",
      "dicimalDigits": 0,
      "rounding": 0,
      "code": "ZMK",
      "namePlural": "Zambian kwachas"
    }
  };

  constructor() { }

  public getSymbol(currency: string) {
    if (!this.currencies[currency]) {
      return '';
    }

    return this.currencies[currency].symbol;
  }
}
