import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Currency = () => {

    const [country, setCountry] = useState(null)
    const [countryName, setCountryName] = useState({})
    const [amount, setAmount] = useState("")

    const [from, setFrom] = useState("usd")
    const [to, setTo] = useState("inr")

    const [Result, setresult] = useState(0)

    useEffect(() => {
        let AllCountry = async () => {
            let AllCountryData = await axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json')
            setCountry(AllCountryData.data.inr)
        }

        AllCountry()
        return () => setCountry(null)
    }, [])
    // console.log("country", country);

    useEffect(() => {
        let AllCountryName = async () => {
            let AllCountryNameData = await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`)
            setCountryName(AllCountryNameData.data)
        }

        AllCountryName()
        return () => setCountryName({})
    }, [])

    // console.log(countryName);

    let OPTION = Object.keys(countryName || {}).map((e) => (
        <option key={e} value={e}>{e.toUpperCase()} - {countryName[e]}</option>
    ))
    // console.log(country);

    useEffect(() => {
        // debugger
        if (country && from && to && amount) {
            let fromRate = country[from]
            let toRate = country[to]

            let total = Number(((amount / fromRate) * toRate).toFixed(2))

            setresult(total)
        }


    }, [country, from, to, amount])


    let swappp = () => {
        if (from && to) {
            setFrom(to)
            setTo(from)
        }
    }




    return (
        <>

            <div className="wrapper">
                <div className="Amount">
                    <input type="number"
                        placeholder='enter the amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}

                    />
                </div>
                <div className="Options">
                    <div className="left">
                        <select value={from} onChange={(e) => setFrom(e.target.value)}>

                            {
                                OPTION
                            }
                        </select>
                    </div>

                    <div className="right">
                        <select value={to} onChange={(e) => setTo(e.target.value)}>

                            {
                                OPTION
                            }
                        </select>
                    </div>
                    <button onClick={swappp}><p><i className="fa-solid fa-arrows-rotate"></i></p></button>
                </div>



                <div className="result">
                    <h1>{amount} {from} = {Result} {to}</h1>
                </div>
            </div>
        </>

    )
}

export default Currency