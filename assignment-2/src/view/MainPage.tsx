import React, { Component } from 'react';

class MainPage extends Component{
    render() {
        return (
          <div className="shopping-list">
            <h1>Shopping List</h1>
            <ul>
              <li>Instagram</li>
              <li>WhatsApp</li>
              <li>Oculus</li>
            </ul>
          </div>
        );
      }
}

export default MainPage