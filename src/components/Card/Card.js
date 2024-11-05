import IconWrapper from '../IconWrapper/IconWrapper';
import { Circle } from 'lucide-react';
import { GROUP_BY, PRIORITY_MAP, STATUS_MAP } from '../../constants';


const Card = ({ ticket, user, groupBy }) => {
  return (
    <div className="ticket-card"  style={{
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      borderRadius: '6px',
      paddingTop:
        groupBy === GROUP_BY.STATUS
          ? '14px'
          : groupBy === GROUP_BY.USER
          ? '12px'
          : '12px', // Default for other cases
      paddingBottom:
        groupBy === GROUP_BY.PRIORITY
          ? '7px'
          : groupBy === GROUP_BY.STATUS
          ? '7px'
          : '1px', // Default for other cases
      paddingLeft: '20px',
      paddingRight: '20px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      height: '100px',
      overflow: 'hidden'
    }}>

      <div className="ticket-header">
        <div className="ticket-id">{ticket.id}</div>
        {user && (
          <div className="user-avatar">
            <div className={`status-dot ${user.available ? 'available' : ''}`}></div>
            {user.name.charAt(0)}
          </div>
        )}
      </div>

{/* title + footer - col flex */}

<div className='titfoot-style'>


{/* title +status icon */}
<div className="ticket-title">


{(groupBy === GROUP_BY.PRIORITY || groupBy === GROUP_BY.USER) && (
    <div className="icon-style">
        <IconWrapper 
            IconComponent={STATUS_MAP[ticket.status].icon} 
            className="mr-2"
        />
    </div>
)}


<div className='tictitle-style'>
  {ticket.title.length > 32 ? `${ticket.title.substring(0, 32)}...` : ticket.title}
</div>


      </div>

      {/* footer */}
      <div className="ticket-footer">

        {/* {ticket.tag.map((tag, index) => (
          <div key={index} className="feature-tag">
            {(groupBy === GROUP_BY.STATUS || groupBy === GROUP_BY.USER) && (
             <IconWrapper 
              IconComponent={ticket.priority === 4 ? PRIORITY_MAP[5].icon : PRIORITY_MAP[ticket.priority].icon} 
              className="mr-2"
              />
            )}
          </div>
        ))} */}

{ticket.tag.map((tag, index) => (
    (groupBy === GROUP_BY.STATUS || groupBy === GROUP_BY.USER) && (
        <div key={index} className="feature-tag">
            <IconWrapper 
                IconComponent={ticket.priority === 4 ? PRIORITY_MAP[5].icon : PRIORITY_MAP[ticket.priority].icon} 
                className="mr-2"
            />
            {/* {tag} */}
        </div>
    )
))}



        {ticket.tag.map((tag, index) => (
          <div key={index} className="feature-icon-tag">
             <>
            <Circle size={12} fill="#a3a7af" />
          
           {tag}
            </>

          </div>
        ))}

      </div>
        </div>


    </div>
  );
};

export default Card;
