import { useEffect, useState } from 'react'
import React from 'react'

import axios from 'axios'

const Currency = () => {


    const [name,setName]=useState()
    const [rate, setRate] = useState(null)
    const [amount, setAmount] = useState("")
    const [from, setFrom] = useState("USD")
    const [to, setTo] = useState("INR")
    const [result, setResult] = useState(0)

    useEffect(()=>{
        let nameComming=async()=>{
                let nameData=await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`)
                setName(nameData.data)
        }
        
        
        nameComming()
    },[])
    console.log(name);

    useEffect(() => {
        let loaddatas = async () => {
            let datas = await axios.get('https://v6.exchangerate-api.com/v6/decd146ac1e208f30fff3352/latest/USD')
            setRate(datas.data)
        }
        loaddatas()
        return () => setRate(null)

    }, [])
    const currencyFullNames = {
        USD: "United States Dollar",
        AED: "UAE Dirham",
        AFN: "Afghan Afghani",
        ALL: "Albanian Lek",
        AMD: "Armenian Dram",
        ANG: "Netherlands Antillean Guilder",
        AOA: "Angolan Kwanza",
        ARS: "Argentine Peso",
        AUD: "Australian Dollar",
        AWG: "Aruban Florin",
        AZN: "Azerbaijani Manat",
        BAM: "Bosnia-Herzegovina Mark",
        BBD: "Barbadian Dollar",
        BDT: "Bangladeshi Taka",
        BGN: "Bulgarian Lev",
        BHD: "Bahraini Dinar",
        BIF: "Burundian Franc",
        BMD: "Bermudian Dollar",
        BND: "Brunei Dollar",
        BOB: "Bolivian Boliviano",
        BRL: "Brazilian Real",
        BSD: "Bahamian Dollar",
        BTN: "Bhutanese Ngultrum",
        BWP: "Botswana Pula",
        BYN: "Belarusian Ruble",
        BZD: "Belize Dollar",
        CAD: "Canadian Dollar",
        CDF: "Congolese Franc",
        CHF: "Swiss Franc",
        CLP: "Chilean Peso",
        CNY: "Chinese Yuan",
        COP: "Colombian Peso",
        CRC: "Costa Rican Colón",
        CUP: "Cuban Peso",
        CZK: "Czech Koruna",
        DKK: "Danish Krone",
        DOP: "Dominican Peso",
        DZD: "Algerian Dinar",
        EGP: "Egyptian Pound",
        ETB: "Ethiopian Birr",
        EUR: "Euro",
        FJD: "Fijian Dollar",
        GBP: "British Pound Sterling",
        GEL: "Georgian Lari",
        GHS: "Ghanaian Cedi",
        HKD: "Hong Kong Dollar",
        HUF: "Hungarian Forint",
        IDR: "Indonesian Rupiah",
        ILS: "Israeli Shekel",
        INR: "Indian Rupee",
        IQD: "Iraqi Dinar",
        IRR: "Iranian Rial",
        JMD: "Jamaican Dollar",
        JOD: "Jordanian Dinar",
        JPY: "Japanese Yen",
        KES: "Kenyan Shilling",
        KRW: "South Korean Won",
        KWD: "Kuwaiti Dinar",
        KZT: "Kazakhstani Tenge",
        LKR: "Sri Lankan Rupee",
        MAD: "Moroccan Dirham",
        MXN: "Mexican Peso",
        MYR: "Malaysian Ringgit",
        NGN: "Nigerian Naira",
        NOK: "Norwegian Krone",
        NPR: "Nepalese Rupee",
        NZD: "New Zealand Dollar",
        OMR: "Omani Rial",
        PEN: "Peruvian Sol",
        PHP: "Philippine Peso",
        PKR: "Pakistani Rupee",
        PLN: "Polish Zloty",
        QAR: "Qatari Riyal",
        RON: "Romanian Leu",
        RUB: "Russian Ruble",
        SAR: "Saudi Riyal",
        SEK: "Swedish Krona",
        SGD: "Singapore Dollar",
        THB: "Thai Baht",
        TRY: "Turkish Lira",
        TWD: "Taiwan Dollar",
        UAH: "Ukrainian Hryvnia",
        UGX: "Ugandan Shilling",
        USD: "United States Dollar",
        UYU: "Uruguayan Peso",
        UZS: "Uzbekistani Som",
        VND: "Vietnamese Dong",
        ZAR: "South African Rand",
        ZMW: "Zambian Kwacha"
    };

    
    


    let formated = rate
        ? Object.entries(rate.conversion_rates).map(([code, value]) => ({
            code,
            name: currencyFullNames[code] || code,
            value
        }))
        : [];
    // console.log(formated)

    // useEffect(() => {   
        let Converter = ()=>{
            if (formated) {
            // const rates = rate.conversion_rates
            // console.log(rates);
            
            const fromRate = formated.find(e=>e.code === from)
            console.log("from ",fromRate);
            
            const toRate = formated.find(r=>r.code=== to)
            console.log(toRate);
            
            
            const converted = Number((amount / fromRate.value) * toRate.value)
            console.log(converted);
            setResult(converted.toFixed(2))

            
            
        }
        }
    // }, [amount, from, to, rate])

    let NAMEOPTION = formated.map((e) => (
        <option key={e.code} value={e.code}>
            {e.code} - {e.name}
        </option>
    ))



    // console.log(rate);





    return (

        <>

            <div className="wrapper">
                <div className="amount">
                    <input type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div className="type">
                    <div className="left">
                        <select value={from} onChange={(e) => setFrom(e.target.value)}>

                            {NAMEOPTION}
                        </select>
                    </div>
                    <div className="right">
                        <select value={to} onChange={(e) => setTo(e.target.value)}>

                            {NAMEOPTION}
                        </select>
                    </div>
                </div>
                <div className="btn">
                    <button onClick={Converter}>Convert</button>
                </div>

                <div className="final">
                    <h1>{amount} {from} = {result} {to}</h1>
                </div>
            </div>

            <select name="" id="">
                {
                    Object.keys(rate?.conversion_rates || {}).map((code)=>(
                        <option key={code} value={code} onChange={output}>{code}-{name[code.toLowerCase()]}</option>
                    ))
                }
            </select>

        </>
    )
}

export default Currency