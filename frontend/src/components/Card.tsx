type CardProps = {
  name: string
  category: string
}

const Card = ({ name, category }: CardProps) => {
  return (
    <div className="card bg-primary text-primary-content col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{category}</p>
        <div className="card-actions justify-center">
          <button className="btn">details</button>
        </div>
      </div>
    </div>
  )
}

export default Card
