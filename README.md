# NolaBytesPlayground

Playing around with Vanilla JS, HTML, and CSS. So far, this has the SearchPage, but with very (very) basic functionality and styling. You can refer to the Figma design (link found in the Discord and ReadMe of the project repo) to see how it should look.

To run this, you can right click on the index.html file, select "Copy Path," and paste that into the search bar of whatever browser you use. Or, you can right click and press "Open With Live Server." If you make a change on the file, you will need to save the file and refresh the brower to see the changes.

I am adding detailed comments to this, feel free to play around with it! Remember, this is not where the project will be and is just a safe place outside of the actual project repo to get familiar with frontend development. I used online resources to quickly convert the React code for this component into vanilla JS and am going through and adding detailed notes. Let me know if you have any questions.

## Files from Old React Project
Below are files from the now uninstalled React project. Use this as a reference for styling or general HTML structure of certain parts of the page, but because it's in React, you won't be able to just copy and paste.

## Header File:
    import './styles.css'
    import { FiLogOut } from "react-icons/fi";

    const Header = () => {
        
        const handleLogout = () => { // function that is called when the logout icon is clicked
            console.log('logged out!') // once authentication and session management is setup, we can implement the logout functionality here!
        }

        return (
            <div style={{display:'flex', direction:'row', justifyContent: 'space-between', backgroundColor: '#8f49a7', height: '60px', alignItems: 'center', width: '100%'}}>
                <div style={{font:'Open Sans', color: 'white', fontSize:'30px', fontWeight: 'bold', margin: '10px'}}>Nola Bytes</div>
                <div style={{display:'flex', direction:'row', alignItems: 'center'}}>
                    <div style={{font:'Open Sans', color: 'white', fontSize:'30px', margin: '10px'}}>Real Name</div>
                    <div>
                        {/* <FiLogOut style={{color:'white', margin: '10px', cursor: ''pointer'}}  size={30} onClick={handleLogout} /> */}
                    </div>
                    
                </div>             
            </div>
        );
    };

## Login Page File:
    import './styles.css'
    import React, {useState} from 'react';
    import Header from '../components/Header';

    function Login() {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        function handleUsernameChange(event) {
            setUsername(event.target.value);
        }

        function handlePasswordChange(event) {
            setPassword(event.target.value);
        }

        function handleSubmit(event) {
            
        }

        return (
            <>
                <div className="welcomeText">
                    <p>Welcome to NOLA Bytes!</p>
                </div>
                <div className="login">
                    <p className="intro">Sign in or <span className="sign_up">Sign Up</span> <br />to continue to NOLA Bytes</p>

                    <p className="username_text">Username:</p> 
                    <input type="text" value={username} className="username_input" onChange={handleUsernameChange}/>

                    <p className="password_text">Password:</p>
                    <input type="password" value={password} className="password_input" onChange={handlePasswordChange}/>

                    <button className="login_button" type="submit" onClick={handleSubmit}>Login</button>
                </div>
            </>
        );
    }
