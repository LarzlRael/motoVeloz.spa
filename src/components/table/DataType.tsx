import { TableHeaderI } from '../../interfaces/tableInterfaces'
import ToolTip from '../boxex/ToolTip'

import { convertD } from '../../utils/convertDate'
import { processUrlImage } from '../../utils/processData'
import { DefaultBtn, RenderButton } from '../Buttons/'
import { isValidArray } from '../../utils/validation/validation'
interface DataTypeProps {
  [key: string]: any
  a: TableHeaderI
}

const DataType = ({ a, head, reload }: DataTypeProps) => {
  switch (a.type) {
    case 'action':
      return (
        <DefaultBtn
          fontSize="1.4rem"
          fontWeight="500"
          background="#e2e4f3"
          color="var(--colorPrimary)"
          /* onClick={() => a.action!(head)} */
          width="auto"
          border="1px solid var(--blue)"
        >
          {a.textBtn}
        </DefaultBtn>
      )
    case 'img':
      return <img src={head[a.key]} alt="avatar" />
    case 'a':
      if (head[a.key] === 'N/A') {
        return <div>{head[a.key]}</div>
      } else {
        return (
          <a href={head[a.key]} target="_blank" rel="noopener noreferrer">
            Abrir Archivo
          </a>
        )
      }
    case 'textColor':
      return (
        <div className="TableDefault__textColor">
          <h4
            style={{
              background: `${a.color![head[a.key]]}`,
              color: a.color![head[a.key]] ? '' : 'var(--black)',
            }}
          >
            {head[a.key]}
          </h4>
        </div>
      )
    case 'date':
      return (
        <div>
          {head[a.key] ? convertD(head[a.key], 'LLL')?.toLocaleString() : '--'}
        </div>
      )
    case 'actions':
      return (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'start' }}>
          {isValidArray(a.actions!) &&
            a.actions!.map((item, i) => (
              <ToolTip key={i} content={item.labelTooltip}>
                <RenderButton
                  background="var(--secondary-color)"
                  onClick={() => item.action(head)}
                >
                  {item.icon}
                </RenderButton>
              </ToolTip>
            ))}
        </div>
      )
    case 'textArea':
      if (head[a.key]) {
        return (
          <div>
            {head[a.key].substring(0, 100) +
              `${head[a.key].length > 100 ? '...' : ''} `}
          </div>
        )
      } else {
        return <div>--</div>
      }
    case 'list':
      if (head[a.key]) {
        const list = head[a.key].split('; ')

        return (
          <div>
            {list.map((item: any, index: number) => (
              <div
                key={index}
                style={{
                  marginBottom: '5px',
                  border: '1px solid gray',
                  borderRadius: '5px',
                  padding: '2px 5px',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )
      } else {
        return <div>--</div>
      }
    /* case 'stringArray':
      if (head[a.key]) {
        const list = head[a.key]

        return (
          <div>
            {list.map((item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '5px',
                  border: '1px solid gray',
                  borderRadius: '5px',
                  padding: '2px 5px',
                }}
              >
                {rolName[item]}
              </div>
            ))}
          </div>
        )
      } else {
        return <div>--</div>
      } */
    default:
      return <div>{head[a.key] ? head[a.key] : '--'}</div>
  }
}

export default DataType
