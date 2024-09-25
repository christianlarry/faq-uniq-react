import FaqAccordion from "../../UI/molecules/accordion/FaqAccordion"
import "./HomePage.css"

const HomePage = ()=>{

  const answer = `
              <img src="https://images.squarespace-cdn.com/content/v1/5ceafa407824f80001793b84/1602883186071-KM5277WCL1BFW8AD4JUH/some-any.jpg?format=1500w" alt="https://images.squarespace-cdn.com/content/v1/5ceafa407824f80001793b84/1602883186071-KM5277WCL1BFW8AD4JUH/some-any.jpg?format=1500w" />
              <br/>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ipsum, natus iure perspiciatis, atque saepe possimus ab molestiae esse eaque molestias commodi vitae obcaecati fugiat aliquid aliquam id voluptatibus quas!</p>
              <br/>
              <p>Cara menyelesaikan masalah (bullet point):</p>
              <ul>
                <li>Step 1</li>
                <li>Step 2</li>
                <li>Step 3</li>
                <li>Step 4</li>
                <li>Step 5</li>
              </ul>
              <br/>
              <p>Cara menyelesaikan masalah (nomor):</p>
              <ol>
                <li>Step 1</li>
                <li>Step 2</li>
                <li>Step 3</li>
                <li>Step 4</li>
                <li>Step 5</li>
              </ol>
              <br/>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, qui perspiciatis. Temporibus totam a aut incidunt esse, necessitatibus, minima numquam recusandae magni ipsum libero, dolorum nobis illum suscipit ex unde?</p>`

  return (
    <div>
      <div className="faq-question-lists">
        <FaqAccordion title="Pertanyaan apakah ini?" answer={answer}/>
        <FaqAccordion title="Pertanyaan apakah ini?" answer={answer}/>
      </div>
    </div>
  )
}

export default HomePage