import { Component } from 'react'
import './index.css'
import { Range, getTrackBackground } from 'react-range'

export default class DoubleSlider extends Component {
  state = {
    values: [this.props.min, this.props.max]
  };

  render () {
    const { filterName, min, max, step } = this.props

    return (
      <div className="os-slider">
        <h3 className="os-slider__title">{ filterName }</h3>
        <div className="range-slider">
          <Range
            step={ step }
            min={ min }
            max={ max }
            values={this.state.values}
            onChange={ (values) => this.setState({ values }) }
            renderTrack={ ({ props, children }) => (
              <div
                onMouseDown={ props.onMouseDown }
                onTouchStart={ props.onTouchStart }
                style={{
                  ...props.style,
                  display: 'flex',
                  height: '4px',
                  width: '100%',
                  backgroundColor: '#7e72f2'
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: '4px',
                    width: '100%',
                    borderRadius: '4px',
                    background: getTrackBackground({
                      values: this.state.values,
                      colors: ['#ccc', '#548BF4', '#ccc'],
                      min: min,
                      max: max
                    }),
                    alignSelf: 'center'
                  }}
                >
                  {children}
                </div>
              </div>
            ) }
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '18px',
                  width: '6px',
                  backgroundColor: '#999'
                }}
              />
            )}
          />
        </div>
        <div className="os-slider__output">
          <span>{ this.state.values[0] } UAH</span>
          <span>{ this.state.values[1] } UAH</span>
        </div>
      </div>
    )
  }
}
