import React, { useState, useEffect } from 'react';
import { Table, Dimmer, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import './book.min.css';

const initIsbn = {
  isbn: '',
  name: '',
  writer: '',
  pub: '',
  date: ''
}

const Book = (props) => {
  const history = useHistory();
  const [details, setdDetails] = useState([]);
  const [dimmer, setDimmer] = useState(false);
  const [isbn, setIsbn] = useState(initIsbn);

  const goToPrevPage = () => {
    history.push('/list');
  }

  console.log(props);

  return (
    <div className="container">
      <Dimmer active={dimmer} inverted page></Dimmer>
      <div className="book inner-container">
        <Button
          className="back-btn"
          onClick={goToPrevPage}
        >返回</Button>
        <h2>所有图书</h2>
        <p>
          书目ISBN：<span>{ isbn.isbn }</span>
          名称：<span>{ isbn.name }</span>
          作者：<span>{ isbn.writer }</span>
          所属出版社：<span>{ isbn.pub }</span>
          出版时间：{ isbn.date }
        </p>
        <div className="detail-table">
          <Table basic textAlign="center">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>图书 ID</Table.HeaderCell>
                <Table.HeaderCell>位置</Table.HeaderCell>
                <Table.HeaderCell>状态</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { details.length ? details.map((detail, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{ index + 1 }</Table.Cell>
                  <Table.Cell>{ detail.id }</Table.Cell>
                  <Table.Cell>{ detail.address }</Table.Cell>
                  <Table.Cell>{ detail.status }</Table.Cell>
                </Table.Row>
              )) : null }
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Book;
