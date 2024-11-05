import IconWrapper from '../IconWrapper/IconWrapper';
import { Circle } from 'lucide-react';
import { GROUP_BY, PRIORITY_MAP, STATUS_MAP } from '../../constants';


const Card = ({ ticket, user, groupBy }) => {
  return (
    <div className="ticket-card">

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
  {ticket.title.length > 35 ? `${ticket.title.substring(0, 35)}...` : ticket.title}
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
