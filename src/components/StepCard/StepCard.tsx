import './StepCard.css'

interface stepCard {
  name: string
  active?: Boolean
  icon?: any
  textColorActive?: Boolean
}

export function StepCard(props: stepCard) {
  return (
    <div
      className="card-container"
      style={{
        background: props.active
          ? 'rgba(129,178,154, 1)'
          : 'rgba(129,178,154, .7)',
        color: props.textColorActive ? '#F2CC8F' : '#3D405B',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',
        }}
      >
        {props.name}
      </div>
      {props.icon}
    </div>
  )
}
