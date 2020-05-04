import React, { useState, useEffect } from 'react';
import { Input, Button, Message, Table } from 'semantic-ui-react';
import api from '../../tools/api';
import './reserve.min.css';

const initBorrow = {
  isbn: '',
  rid: '',
  days: 0
}

const initError = {
  isbn: false,
  rid: false
}

const initRes = {
  code: ''
}

const initBookInfo = {
  isbn: '',
  botime: '',
  outime: '',
  rid: ''
}

const Reserve = () => {
  const [borrow, setBorrow] = useState(initBorrow);
  const [error, setError] = useState(initError);
  const [btnLoading, setBtnLoading] = useState(false);
  const [bookInfo, setBookInfo] = useState(initBookInfo)
  const [res, setRes] = useState(initRes);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    api
      .getReserve()
      .then(res => {
        if(res.status === 200) {
          setDetails(res.data.data);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const handleInputChange = (e, v) => {
    setBorrow({
      ...borrow,
      [v.id]: v.value
    });
    setError(initError);
  }

  const dealTime = (time) => {
    if(time === "") {
      return;
    }

    let data = "";
    let temp = time.split('T');
    data +=  temp[0];
    let temp2 = temp[1].split('.');
    data += ' ' + temp2[0];

    return data;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    for(let item in error) {
      if(borrow[item] === "") {
        setError({
          ...error,
          [item]: true
        });
        return;
      }
    }

    if(borrow.days <= 0) {
      setRes({
        code: 61,
        message: '预约天数需要大于 0 天！'
      });
      setTimeout(() => {
        setRes(initRes);
      }, 3000);
      return;
    }
    if(borrow.days > 10) {
      setRes({
        code: 61,
        message: '预约天数需要小于 10 天！'
      });
      setTimeout(() => {
        setRes(initRes);
      }, 3000);
      return;
    }

    setBtnLoading(true);

    const data = borrow;

    api
      .reserveBook(data)
      .then(res => {
        setBtnLoading(false);
        if(res.status === 200) {
          setRes(res.data);
          if(res.data.code === 64) {
            setBorrow(initBorrow);
            setBookInfo(res.data.resInfo);
          }
          setTimeout(() => {
            setRes(initRes);
          }, 3000);
        }
      })
      .catch(error => {
        setBtnLoading(false);
        setRes({
          code: 61,
          message: '预约失败...'
        });
        setTimeout(() => {
          setRes(initRes);
        }, 3000);
      })

  }

  return (
    <div className="container">
      <div className="inner-container">
        <div className="borrow">
          <div className="reserve-img"></div>
          <div className="form-box">
            <h2>办理图书预约手续</h2>
            <form
              className="form"
              onSubmit={handleFormSubmit}
            >
              <div className="input-group">
                <p>图书书目 ID：</p>
                <Input
                  fluid
                  id="isbn"
                  type="text"
                  value={borrow.isbn}
                  error={error.isbn}
                  className="form-input"
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <p>读者 ID：</p>
                <Input
                  fluid
                  id="rid"
                  type="text"
                  value={borrow.rid}
                  error={error.rid}
                  className="form-input"
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <p>预约天数：</p>
                <Input
                  fluid
                  id="days"
                  type="number"
                  value={borrow.days}
                  error={error.days}
                  className="form-input"
                  onChange={handleInputChange}
                />
              </div>

              { res.code === 61 ? (
                <Message error>
                { res.message ? (
                  <p>{ res.message }</p>
                ) : (
                  <p>预约失败，读者 ID 不存在</p>
                ) }</Message>
              ) : null }
              { res.code === 62 ? (
                <Message error>预约失败，该书目不存在</Message>
              ) : null }
              { res.code === 63 ? (
                <Message error>预约失败，该预约信息已存在</Message>
              ) : null }
              { res.code === 64 ? (
                <Message success>预约成功</Message>
              ) : null }

              <Button
                loading={btnLoading}
                onClick={handleFormSubmit}
              >预约</Button>
            </form>
            { bookInfo.isbn === "" ? null : (
              <div className="receipt">
                <h2>预约凭据</h2>
                <p>图书书目 ISBN：{ bookInfo.isbn }</p>
                <p>读者 ID：{ bookInfo.rid }</p>
                <p>预约开始时间：{ dealTime(bookInfo.begtime) }</p>
                <p>预约结束时间：{ dealTime(bookInfo.endtime) }</p>
              </div>
            ) }
          </div>
        </div>
        <div className="detail">
          <h2>历史预约记录</h2>
          <div className="detail-table">
            <Table basic textAlign="center">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>#</Table.HeaderCell>
                  <Table.HeaderCell>图书书目 ISBN：</Table.HeaderCell>
                  <Table.HeaderCell>读者 ID</Table.HeaderCell>
                  <Table.HeaderCell>预约开始时间</Table.HeaderCell>
                  <Table.HeaderCell>预约结束时间</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                { details.length ? details.map((detail, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{ index + 1 }</Table.Cell>
                    <Table.Cell>{ detail.isbn }</Table.Cell>
                    <Table.Cell>{ detail.rid }</Table.Cell>
                    <Table.Cell>{ dealTime(detail.begtime) }</Table.Cell>
                    <Table.Cell>{ dealTime(detail.endtime) }</Table.Cell>
                  </Table.Row>
                )) : null }
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reserve;
