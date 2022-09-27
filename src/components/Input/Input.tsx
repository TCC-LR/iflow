import './Input.css'

interface IInput {
  id?: string
  icon?: any
  typeTextarea?: Boolean
  height?: string
  placeholder: string
  disabled?: Boolean
  value?: string
  onChangeHandler?: any
  name?: string
}

export function Input(props: IInput) {
  if (props.typeTextarea) {
    return (
      <div className="input-container">
        {props.icon}
        <textarea
          id={props.id}
          className="input-css "
          disabled={!!props.disabled}
          style={{ height: props.height }}
          onChange={props.onChangeHandler}
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
        >
          {props.value}
        </textarea>
      </div>
    )
  }

  return (
    <>
      <div className="input-container">
        {props.icon}
        <input
          id={props.id}
          className="input-css ml-[13px]"
          placeholder={props.placeholder}
          style={{ height: props.height }}
          onChange={props.onChangeHandler}
          disabled={!!props.disabled}
          value={props.value}
          name={props.name}
        />
      </div>
    </>
  )
}
