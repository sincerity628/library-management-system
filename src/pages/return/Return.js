import React, { useState, useContext } from 'react';
import { Input, Button, Message } from 'semantic-ui-react';
import { UserContext } from '../../contexts/UserContext';
import api from '../../tools/api';
import './return.min.css';

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
  retime: '',
  rid: '',
  fine: 0.0
}

const Return = () => {
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

    console.log(data);

    api
      .returnBook(data)
      .then(res => {
        setBtnLoading(false);
        if(res.status === 200) {
          setRes(res.data);
          if(res.data.code === 52) {
            setBorrow(initBorrow);
            setBookInfo(res.data.retInfo);
          }
          setTimeout(() => {
            setRes(initRes);
          }, 3000);
        }
      })
      .catch(error => {
        setBtnLoading(false);
        setRes({
          code: 51,
          message: '还书失败...'
        });
        setTimeout(() => {
          setRes(initRes);
        }, 3000);
      })

  }

  return (
    <div className="container">
      <div className="borrow return inner-container">
        <div className="return-img"></div>
        <div className="form-box">
          <h2>办理还书手续</h2>
          <form
            className="form"
            onSubmit={handleFormSubmit}
          >
            <div className="input-group">
              <p>图书 ID：</p>
              <Input
                fluid
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
                fluid
                id="rid"
                type="text"
                value={borrow.rid}
                error={error.rid}
                className="form-input"
                onChange={handleInputChange}
              />
            </div>

            { res.code === 51 ? (
              <Message error>
              { res.message ? (
                <p>{ res.message }</p>
              ) : (
                <p>还书失败，不存在该借阅记录</p>
              ) }</Message>
            ) : null }
            { res.code === 52 ? (
              <Message success>还书成功</Message>
            ) : null }

            <Button
              loading={btnLoading}
              onClick={handleFormSubmit}
            >还书</Button>
          </form>
          { bookInfo.bid === "" ? null : (
            <div className="receipt">
              <h2>还书凭据</h2>
              <p>图书 ID：{ bookInfo.bid }</p>
              <p>读者 ID：{ bookInfo.rid }</p>
              <p>操作管理员 ID：{ bookInfo.mid }</p>
              <p>借书时间：{ dealTime(bookInfo.botime) }</p>
              <p>还书时间：{ dealTime(bookInfo.retime) }</p>
              <p>超期罚款：{ bookInfo.fine }</p>
            </div>
          ) }
        </div>
      </div>
    </div>
  );
}

export default Return;
