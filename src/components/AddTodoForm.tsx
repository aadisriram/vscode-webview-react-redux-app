import * as React from "react";
import { FormEvent } from "react";

interface Props {
  handleSubmit: (value: string) => void;
}
interface State {
  value: string;
}

export default class AddTodoForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: "" }; // Value is empty by default
    this._updateValue = this._updateValue.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  public _updateValue(value: string) {
    this.setState({ value });
  }

  public _handleSubmit(e: FormEvent<any>) {
    e.preventDefault();
    if (!this.state.value.trim()) {
      return;
    }

    this.props.handleSubmit(this.state.value);
    this.setState({ value: "" });
  }

  public render() {
    const { value } = this.state;
    const { _updateValue, _handleSubmit } = this;
    return (
      <form onSubmit={_handleSubmit}>
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            value={value}
            onChange={e => _updateValue(e.target.value)}
          />
          <span className="input-group-btn">
            <button className="btn btn-primary" type="submit">
              Add todo !
            </button>
          </span>
        </div>
      </form>
    );
  }
}
