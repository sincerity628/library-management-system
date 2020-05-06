import React, { useState, useEffect } from 'react';
import { Table, Dimmer } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import api from '../../tools/api';
import './list.min.css';

const List = () => {
  const [details, setDetails] = useState([]);
  const [dimmer, setDimmer] = useState(false);

  useEffect(() => {
    setDimmer(true);

    api
      .getCip()
      .then(res => {
        setDimmer(false);
        if(res.status === 200) {
          setDetails(res.data.data);
        }
      })
      .catch(error => {
        setDimmer(false);
        console.log(error);
      })
  }, []);

  return (
    <div className="container">
      <div className="list inner-container">
        <Dimmer active={dimmer} inverted page></Dimmer>
        <h2>所有书目</h2>
        <div className="detail-table">
          <Table basic textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>书目 ISBN</Table.HeaderCell>
                <Table.HeaderCell>名称</Table.HeaderCell>
                <Table.HeaderCell>作者</Table.HeaderCell>
                <Table.HeaderCell>所属出版社</Table.HeaderCell>
                <Table.HeaderCell>出版时间</Table.HeaderCell>
                <Table.HeaderCell>图书数量</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { details.length ? details.map((detail, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{ index + 1 }</Table.Cell>
                  <Table.Cell>
                    <Link to={`/book/${detail.isbn}`}>{ detail.isbn }</Link>
                  </Table.Cell>
                  <Table.Cell>{ detail.name }</Table.Cell>
                  <Table.Cell>{ detail.writer }</Table.Cell>
                  <Table.Cell>{ detail.pub }</Table.Cell>
                  <Table.Cell>{ detail.date }</Table.Cell>
                  <Table.Cell>
                    <Link to={`/book/${detail.isbn}`}>{ detail.num }</Link>
                  </Table.Cell>
                </Table.Row>
              )) : null }
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default List;
