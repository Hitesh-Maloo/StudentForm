import React, { useState, useEffect } from 'react';
import './Styles/Custom.css'

const arr = [{"title": "Surat"},{"title": "Ahemdabad"},{"title": "Kota"}];

function Student() {
    const [values, setValues] = useState({ Email: '', Name: '', PhoneNo: '', City: '', Password: '', Create: '' });
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [show, setShow] = useState(false);
    const [data, setData] = useState(arr)
    const container = React.useRef();

    useEffect(() => {
        let handler = (event) => {
            if (!container.current.contains(event.target)) {
                document.getElementById('opt').style.display = 'none';
            }
        }
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler
            )
        };
    })

    const handleEmail = (event) => {
        event.persist();
        setValues((values) => ({ ...values, Email: event.target.value, }));
    };

    const handleName = (event) => {
        event.persist();
        setValues((values) => ({ ...values, Name: event.target.value, }));
    };

    const handlePhoneNo = (event) => {
        event.persist();
        setValues((values) => ({ ...values, PhoneNo: event.target.value, }));
    };

    const handleCity = (event) => {
        event.persist();
        document.getElementById('opt').style.display = 'block';
    };

    const handleBlur = (e) => {
        document.getElementById('opt').style.display = 'none';
        document.getElementById('myInput').value = e;
        setValues((values) => ({ ...values, City: e }));
    }

    const handlePassword = (event) => {
        event.persist();
        setValues((values) => ({ ...values, Password: event.target.value }));
    };

    const handleCreate = (event) => {
        event.persist();
        setValues((values) => ({ ...values, Create: event.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.Email && values.Name && values.City && values.PhoneNo && values.Password) {
            setValid(true);
            setTimeout(() => {window.location.reload(true)}, 2000)
        }
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false);}, 2000)
    };

    const handleAdd = () => {
        let ps=[...arr,{title:values.Create}];
        arr.push({title:values.Create});
        setData(ps);     
        document.getElementById('createdrop').style.display = 'none';
        document.getElementById('createButton').style.display = 'none'; 
        document.getElementById('myInput').value = '';                     
        setShow(true);               
        setTimeout(() => {
            setShow(false)           
        }, 2000)

    }        

    const filterdata = (e) => {
        if (e.target.value == '') {                
            document.getElementById('createdrop').style.display = 'none';
            document.getElementById('createButton').style.display = 'none';
            setData(arr)
            return
        }
        const searchResult = data.filter(item => item.title.toLowerCase().startsWith(e.target.value.toLowerCase()))
        if (e.target.value != '' && searchResult == '') {
            document.getElementById('createdrop').style.display = 'block';
            document.getElementById('createButton').style.display = 'block';
        }
        setData(searchResult);        
    }

    return (
        <div>
            <header className='headStyle'>Student Form</header>
            <form autoComplete='off' className="student-form" onSubmit={handleSubmit}>
                {submitted && valid ? <div className='success-message'>Success! Thank you for registering</div> : ''}
                {show ? <div className='Added-message'>Data Added Successfully!</div> : ''}
                <input
                    id="email"
                    className="form-field"
                    type="text"
                    placeholder="Email"
                    name="Email"
                    value={values.Email}
                    onChange={handleEmail}
                />

                {submitted && !values.Email && <span id='email-error'>Please enter an email</span>}

                <input
                    id="name"
                    className="form-field"
                    type="text"
                    placeholder="Full Name"
                    name="Name"
                    value={values.Name}
                    onChange={handleName}
                />

                {submitted && !values.Name && <span id='name-error'>Please enter a first name</span>}

                <input
                    id="phoneNo"
                    className="form-field"
                    type="text"
                    placeholder="PhoneNo"
                    name="PhoneNo"
                    value={values.PhoneNo}
                    onChange={handlePhoneNo}
                />

                {submitted && !values.PhoneNo && <span id='PhoneNo-error'>Please enter a PhoneNo</span>}

                <div id='search-dropdown' className='form-field' style={{ padding: "0" }} ref={container}>
                    <input
                        id="myInput"
                        className="full-field"
                        type="text"
                        placeholder="Select City Name..."
                        name="hidden"
                        style={{ margin: '10px 0px 0px 0px' }}
                        onChange={filterdata}
                        onFocus={handleCity}
                        // value={values.City}
                        defaultValue={values.City}
                        autoComplete='off'
                    ></input>
                    <div id='opt' className='option-container'>
                        {/* <input type='text' placeholder='Search...' className='search-bar' onChange={filterdata}></input> */}
                        {data.map((value) => {
                            return (
                                <div className='options' key={value.title}>
                                    <a href={'#' + value.title} onClick={() => handleBlur(value.title)}>{value.title}</a>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {submitted && !values.City && <span id='city-error'>Please enter a city name</span>}

                <input
                    id="password"
                    className="form-field"
                    type="text"
                    placeholder="Password"
                    name="Password"
                    value={values.Password}
                    onChange={handlePassword}
                />

                {submitted && !values.Password && <span id='Password-error'>Please enter a Password</span>}

                <input type="submit" value="Submit" />
            </form>
            <div>
                <input
                    id="createdrop"
                    className="create-field"
                    type="text"
                    placeholder="Enter Text"
                    name="Password"
                    value={values.Create}
                    onChange={handleCreate}
                />
                <button id="createButton" className="create-field" onClick={handleAdd}>Create</button>
            </div>
        </div>
    )
}

export default Student
