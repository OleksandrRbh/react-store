import { Component } from 'react'
import './index.css'
import { Range, getTrackBackground } from 'react-range'

export default class DoubleSlider extends Component {
  state = {
    values: [this.props.min, this.props.max]
  };

  handleSliderChange = (values) => {
    const { filterName, onFilterChange } = this.props
    const payload = {
      [`${filterName}_gte`]: values[0],
      [`${filterName}_lte`]: values[1]
    }
    onFilterChange(payload)
  }

  reset = () => {
    this.setState({ values: [this.props.min, this.props.max] })
  }

  render () {
    const { filterName, min, max, step, units } = this.props

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
            onFinalChange={ this.handleSliderChange }
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
                      colors: ['#c8c2f3', '#7e72f2', '#c8c2f3'],
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
                  backgroundColor: '#fff',
                  border: '1px solid #2c2c2c'
                }}
              />
            )}
          />
        </div>
        <div className="os-slider__output">
          <span>{ this.state.values[0] } { units }</span>
          <span>{ this.state.values[1] } { units }</span>
        </div>
      </div>
    )
  }
}
