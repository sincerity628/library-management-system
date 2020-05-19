import React, { useState, useEffect } from 'react';
import { Table, Dimmer } from 'semantic-ui-react';
import api from '../../tools/api';

const ReaderList = () => {
  const [details, setDetails] = useState([]);
  const [dimmer, setDimmer] = useState(false);

  useEffect(() => {
    setDimmer(true);

    api
      .getReader()
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
        <h2>所有读者</h2>
        <div className="detail-table">
          <Table basic textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>读者 ID</Table.HeaderCell>
                <Table.HeaderCell>姓名</Table.HeaderCell>
                <Table.HeaderCell>联系电话</Table.HeaderCell>
                <Table.HeaderCell>邮箱</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { details.length ? details.map((detail, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{ index + 1 }</Table.Cell>
                  <Table.Cell>{ detail.id }</Table.Cell>
                  <Table.Cell>{ detail.name }</Table.Cell>
                  <Table.Cell>{ detail.phone }</Table.Cell>
                  <Table.Cell>{ detail.email }</Table.Cell>
                </Table.Row>
              )) : null }
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ReaderList;
