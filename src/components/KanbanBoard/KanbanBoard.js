import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Card from '../Card/Card';
import IconWrapper from '../IconWrapper/IconWrapper';
import { GROUP_BY, SORT_BY, STATUS_ORDER, PRIORITY_MAP, STATUS_MAP } from '../../constants';
import AddIcon from '../../assets/add.svg';
import MenuIcon from '../../assets/3 dot menu.svg';

const fetchData = async () => {
  try {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || GROUP_BY.STATUS);
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || SORT_BY.PRIORITY);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      if (data) {
        setTickets(data.tickets);
        setUsers(data.users);
      }
    };
    loadData();
  }, []);

  const handleDisplayChange = (newGrouping, newSorting) => {
    setGrouping(newGrouping);
    setSorting(newSorting);
  };

  const sortTickets = (ticketsToSort) => {
    return [...ticketsToSort].sort((a, b) => {
      if (sorting === SORT_BY.PRIORITY) {
        return b.priority - a.priority;
      }
      return a.title.localeCompare(b.title);
    });
  };

  const getGroupOrder = (groupKey) => {
    switch (groupKey) {
      case GROUP_BY.STATUS:
        return STATUS_ORDER;
      case GROUP_BY.PRIORITY:
        return [0, 4, 3, 2, 1];
      case GROUP_BY.USER:
        return users
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(user => user.id);
      default:
        return [];
    }
  };

  const groupTickets = () => {
    let groups = {};

    if (grouping === GROUP_BY.STATUS) {
      STATUS_ORDER.forEach(status => {
        groups[status] = [];
      });
      tickets.forEach(ticket => {
        if (groups[ticket.status]) {
          groups[ticket.status].push(ticket);
        }
      });
    } else if (grouping === GROUP_BY.USER) {
      users.forEach(user => {
        groups[user.id] = { tickets: [], user: user };
      });
      tickets.forEach(ticket => {
        if (groups[ticket.userId]) {
          groups[ticket.userId].tickets.push(ticket);
        }
      });
    } else if (grouping === GROUP_BY.PRIORITY) {
      Object.keys(PRIORITY_MAP).forEach(priority => {
        groups[priority] = [];
      });
      tickets.forEach(ticket => {
        groups[ticket.priority].push(ticket);
      });
    }

    Object.keys(groups).forEach(key => {
      if (grouping === GROUP_BY.USER) {
        groups[key].tickets = sortTickets(groups[key].tickets);
      } else {
        groups[key] = sortTickets(groups[key]);
      }
    });

    return groups;
  };

  const renderGroups = () => {
    const groups = groupTickets();
    const order = getGroupOrder(grouping);
    
    return order.map(key => {
      const value = groups[key] || [];
      const ticketsCount = grouping === GROUP_BY.USER ? 
        (groups[key]?.tickets?.length || 0) : 
        (groups[key]?.length || 0);

      if (grouping === GROUP_BY.USER && !groups[key]) {
        return null;
      }

      return (
        <div key={key} className="kanban-column">

          <div className="column-header">

            {grouping === GROUP_BY.STATUS && (
              <>
                <IconWrapper IconComponent={STATUS_MAP[key].icon} />
                <span>{STATUS_MAP[key].label}</span>
              </>
            )}

            {grouping === GROUP_BY.PRIORITY && (
              <>
                <IconWrapper IconComponent={PRIORITY_MAP[key].icon} />
                <span>{PRIORITY_MAP[key].label}</span>
              </>
            )}

            {grouping === GROUP_BY.USER && (
              <>
                <div className="user-avatar">
                  {value.user.name.charAt(0)}
                  <span className={`status-dot ${value.user.available ? 'available' : ''}`}></span>
                </div>
                <span>{value.user.name}</span>
              </>
            )}

            <span className="ticket-count">{ticketsCount}</span>


            {!(grouping === GROUP_BY.STATUS && key === 'Cancelled') && (
              <>
                <img src={AddIcon} alt="Add" />
                <img src={MenuIcon} alt="Menu" />
              </>
            )}

          </div>

          <div className="column-content">
            {(grouping === GROUP_BY.USER ? value.tickets : value).map(ticket => (
              <Card
                key={ticket.id}
                ticket={ticket}
                user={grouping !== GROUP_BY.USER ? users.find(u => u.id === ticket.userId) : null}
                groupBy={grouping}
              />
            ))}
          </div>
        </div>
      );
    }).filter(Boolean);
  };

  return (
    <div>
      <Header onDisplayChange={handleDisplayChange} />
      <div className="kanban-board">{renderGroups()}</div>
    </div>
  );
};

export default KanbanBoard;