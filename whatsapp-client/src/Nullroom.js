import React from 'react'
import "./Nullroom.css";
import wimg from "./assets/whatsappintro.jpg";
function Nullroom() {
    // const [seed, setSeed] = useState("");
    // useEffect(() => {
    //     setSeed(Math.floor(Math.random() * 5000));
    // }, []);
    return (
        <div class="null">
            <div class="null__body">
                {/* <div class="_2JIth" data-asset-intro-image-light="true">
                </div> */}
                <div class="null__centre">
                    
                    <img className='null__introimage' src={wimg} alt="Whatsapp intro logo"/>
                    
                    <h1>Welcome to whatsapp-clone</h1>
                    <div className='null__details'>Click on any contact to chat in realtime response. This project is made by following cleverprogramming tutorials</div>
                    <div class="null__contact">
                        <span class="_33d9M">
                            <span data-testid="laptop" data-icon="laptop" class="">
                                <svg viewBox="0 0 21 18" width="21" height="18" class="">
                                    {/* <path fill="currentColor" d="M10.426 14.235a.767.767 0 0 1-.765-.765c0-.421.344-.765.765-.765s.765.344.765.765-.344.765-.765.765zM4.309 3.529h12.235v8.412H4.309V3.529zm12.235 9.942c.841 0 1.522-.688 1.522-1.529l.008-8.412c0-.842-.689-1.53-1.53-1.53H4.309c-.841 0-1.53.688-1.53 1.529v8.412c0 .841.688 1.529 1.529 1.529H1.25c0 .842.688 1.53 1.529 1.53h15.294c.841 0 1.529-.688 1.529-1.529h-3.058z">
                                </path> */}
                                </svg>
                            </span></span>
                        <div class="null__contactpara">Here is my &nbsp; <a href="https://www.linkedin.com/in/ashish-tiwari-8b95671bb/" target="_blank"> Linkedin</a>&nbsp; and &nbsp; <a href="https://github.com/ashtiv" target="_blank">Github</a>&nbsp;  for contact purpose.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nullroom
