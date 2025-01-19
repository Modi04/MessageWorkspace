import { useRouter } from 'next/router';
import Card from '../../components/Card';


const example = [
{
  profile : "A",
  name : "UnknownA",
  description : "Hello!"
},

{
  profile : "B",
  name : "UnknownB",
  description : "Hello!"
},

{
  profile : "C",
  name : "UnknownC",
  description : "Hello!"
},

{
  profile : "D",
  name : "UnknownD",
  description : "Hello!"
},

{
  profile : "E",
  name : "UnknownE",
  description : "Hello!"
},

{
  profile : "F",
  name : "UnknownF",
  description : "Hello!"
},

{
  profile : "G",
  name : "UnknownG",
  description : "Hello!"
},

{
  profile : "H",
  name : "UnknownH",
  description : "Hello!"
}

]

export default function Index() {
  const router = useRouter();

  return (
    <div className="bg-black">
      <div className='text-white text-3xl mb-5 mt-3'>Friends</div>
      {example.map((message, index) => (
        <Card key={index} message={message} />
      ))}
    </div>
  );
}
