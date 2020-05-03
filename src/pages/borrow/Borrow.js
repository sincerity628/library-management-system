import React, { useState, useContext } from 'react';
import { Input, Button, Message } from 'semantic-ui-react';
import { UserContext } from '../../contexts/UserContext';
import api from '../../tools/api';
import './borrow.min.css';

const initBorrow = {
  bid: '',
  rid: '',
  mid: ''
}

const initError = {
  bid: false,
  rid: false
}

const initRes = {
  code: ''
}

const initBookInfo = {
  bid: '',
  botime: '',
  mid: '',
  outime: '',
  rid: ''
}

const Borrow = () => {
  const { user } = useContext(UserContext);
  const [borrow, setBorrow] = useState(initBorrow);
  const [error, setError] = useState(initError);
  const [btnLoading, setBtnLoading] = useState(false);
  const [bookInfo, setBookInfo] = useState(initBookInfo)
  const [res, setRes] = useState(initRes);

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

    setBtnLoading(true);

    const data = borrow;
    data.mid = user.id;

    api
      .borrowBook(data)
      .then(res => {
        setBtnLoading(false);
        if(res.status === 200) {
          setRes(res.data);
          if(res.data.code === 46) {
            setBorrow(initBorrow);
            setBookInfo(res.data.boInfo);
          }
          setTimeout(() => {
            setRes(initRes);
          }, 3000);
        }
      })
      .catch(error => {
        setBtnLoading(false);
        setRes({
          code: '40',
          message: '借书失败...'
        });
        setTimeout(() => {
          setRes(initRes);
        });
      })

  }

  return (
    <div className="borrow container">
      <main>
        <div className="borrow-img"></div>
        <div className="form-box">
          <h2>办理借书手续</h2>
          <form
            className="form"
            onSubmit={handleFormSubmit}
          >
            <div className="input-group">
              <p>图书 ID：</p>
              <Input
                id="bid"
                type="text"
                value={borrow.bid}
                error={error.bid}
                className="form-input"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <p>读者 ID：</p>
              <Input
                id="rid"
                type="text"
                value={borrow.rid}
                error={error.rid}
                className="form-input"
                onChange={handleInputChange}
              />
            </div>

            { res.code === 40 ? (
              <Message error>
              { res.message ? (
                <p>{ res.message }</p>
              ) : (
                <p>借书失败，该书籍已被预约</p>
              ) }</Message>
            ) : null }
            { res.code === 41 ? (
              <Message error>借书失败，该书籍不存在</Message>
            ) : null }
            { res.code === 42 ? (
              <Message error>借书失败，该读者账号不存在</Message>
            ) : null }
            { res.code === 43 ? (
              <Message error>借书失败，该书籍已借出</Message>
            ) : null }
            { res.code === 44 ? (
              <Message error>借书失败，该书籍不可外借</Message>
            ) : null }
            { res.code === 45 ? (
              <Message error>借书失败，该读者借阅数已达到上限</Message>
            ) : null }
            { res.code === 46 ? (
              <Message success>借书成功</Message>
            ) : null }

            <Button
              loading={btnLoading}
              onClick={handleFormSubmit}
            >借书</Button>
          </form>
          <div className="receipt">
            <h2>借阅凭据</h2>
            <p>图书 ID：{ bookInfo.bid }</p>
            <p>读者 ID：{ bookInfo.rid }</p>
            <p>操作管理员 ID：{ bookInfo.mid }</p>
            <p>借书时间：{ dealTime(bookInfo.botime) }</p>
            <p>还书时间：{ dealTime(bookInfo.outime) }</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Borrow;
