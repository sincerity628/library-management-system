import React, { useState, useEffect } from 'react';
import { Table, Dimmer, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import api from '../../tools/api';
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
  const [details, setDetails] = useState([]);
  const [dimmer, setDimmer] = useState(false);
  const [isbn, setIsbn] = useState(initIsbn);

  const goToPrevPage = () => {
    history.push('/list');
  }

  const transAdd = (address) => {
    if(address === 0) {
      return '流通室';
    } else {
      return '阅览室'
    }
  }

  const transSta = (status) => {
    if(status === 1) {
      return '未借出';
    } else if(status === 2) {
      return '已借出';
    } else if(status === 3) {
      return '不外借';
    } else {
      return '已预约'
    }
  }

  useEffect(() => {
    setDimmer(true);

    const data = {
      isbn: props.match.params.id
    }

    api
      .getBook(data)
      .then(res => {
        setDimmer(false);
        if(res.status === 200) {
          setIsbn(res.data.data);
          setDetails(res.data.data.books);
        }
      })
      .catch(error => {
        setDimmer(false);
        console.log(error);
      })

  }, [props]);

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
          名称：{ isbn.name }
        </p>
        <p>
          作者：<span>{ isbn.writer }</span>
          所属出版社：<span>{ isbn.pub }</span>
          出版时间：{ isbn.date }
        </p>
        <div className="detail-table">
          { details.length ? (
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
                    <Table.Cell>{ transAdd(detail.address) }</Table.Cell>
                    <Table.Cell>{ transSta(detail.status) }</Table.Cell>
                  </Table.Row>
                )) : null }
              </Table.Body>
            </Table>
          ) : (
            <div className="no-book">此书目下暂无图书...</div>
          ) }
        </div>
      </div>
    </div>
  );
}

export default Book;
