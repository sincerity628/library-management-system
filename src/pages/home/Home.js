import React, { useState, useContext } from 'react';
import { Input, Button, Message, Select } from 'semantic-ui-react';
import { UserContext } from '../../contexts/UserContext';
import api from '../../tools/api';
import './home.min.css';
import './public.min.css';

const initQueryRes = {
  code: 0,
}

const initAddInfo = {
  isbn: '',
  name: '',
  writer: '',
  pub: '',
  date: '',
  mid: ''
}

const initAddError = {
  isbn: false,
  name: false,
  writer: false,
  pub: false,
  date: false,
}

const initAddRes = {
  code: 0
}

const initDeleteRes = {
  codes: [0]
}

const initAddBook = {
  id: '',
  isbn: '',
  address: 0,
  status: 0,
  mid: ''
}

const initAddBookError = {
  id: false,
  isbn: false,
  address: false,
}

const selectList = [
  { value: 0, text: '流通室' },
  { value: 1 ,text: '阅览室' }
];

const initAddBookRes = {
  codes: [0]
}

const initDeleteBookRes = {
  codes: [0]
}

const Home = () => {
  const { user } = useContext(UserContext);
  // query
  const [queryISBN, setQueryISBN] = useState("");
  const [btnLoading1, setBtnLoading1] = useState(false);
  const [queryRes, setQueryRes] = useState(initQueryRes);
  // add cip
  const [addInfo, setAddInfo] = useState(initAddInfo);
  const [addError, setAddError] = useState(initAddError);
  const [btnLoading2, setBtnLoading2] = useState(false);
  const [addRes, setAddRes] = useState(initAddRes);
  // delete cip
  const [deleteISBN, setDeleteISBN] = useState("");
  const [btnLoading3, setBtnLoading3] = useState(false);
  const [deleteRes, setDeleteRes] = useState(initDeleteRes);
  // add book
  const [addBook, setAddBook] = useState(initAddBook);
  const [addBookError, setAddBookError] = useState(initAddBookError);
  const [btnLoading4, setBtnLoading4] = useState(false);
  const [addBookRes, setAddBookRes] = useState(initAddBookRes);
  // delete book
  const [deleteBook, setDeleteBook] = useState("");
  const [btnLoading5, setBtnLoading5] = useState(false);
  const [deleteBookRes, setDeleteBookRes] = useState(initDeleteBookRes);

  // query
  const handleInputChange1 = (e, v) => {
    setQueryISBN(v.value);
  }

  const handleFormSubmit1 = (e) => {
    e.preventDefault();

    if(!queryISBN) {
      setQueryRes({
        code: 20,
        message: '请输入查询内容！'
      });
      setTimeout(() => {
        setQueryRes(initQueryRes);
      }, 3000);
      return;
    }

    setBtnLoading1(true);

    const data = {
      isbn: queryISBN
    }
    api
      .isExist(data)
      .then(res => {
        setBtnLoading1(false);
        if(res.status === 200) {
          setQueryRes(res.data);
          setTimeout(() => {
            setQueryRes(initQueryRes);
          }, 3000);
        }
      })
      .catch(error => {
        setBtnLoading1(false);
        setQueryRes({
          code: 20,
          message: '查询失败...'
        });
        setTimeout(() => {
          setQueryRes(initQueryRes);
        }, 3000);
      })
  }

  // add cip
  const handleInputChange2 = (e, v) => {
    setAddInfo({
      ...addInfo,
      [v.id]: v.value
    });
    setAddError(initAddError);
  }

  const handleFormSubmit2 = (e) => {
    e.preventDefault();

    for(let item in addError) {
      if(addInfo[item] === '') {
        setAddError({
          ...addError,
          [item]: true
        });
        return;
      }
    }

    setBtnLoading2(true);

    const data = addInfo;
    data.mid = user.id;

    api
      .addCip(data)
      .then(res => {
        setBtnLoading2(false);
        if(res.status === 200) {
          if(res.data.code === 23) {
            setAddInfo(initAddInfo);
          }
          setAddRes(res.data);
          setTimeout(() => {
            setAddRes(initAddRes);
          }, 3000);
        }
      })
      .catch(error => {
        setBtnLoading2(false);
        setAddRes({
          code: 22,
          message: "添加失败..."
        });
        setTimeout(() => {
          setAddRes(initAddRes);
        }, 3000);
      })
  }

  // delete cip
  const handleInputChange3 = (e, v) => {
    setDeleteISBN(v.value);
  }

  const handleFormSubmit3 = (e) => {
    e.preventDefault();

    if(!deleteISBN) {
      setDeleteRes({
        codes: [26],
        message: '请填写要删除的书目 ISBN！'
      });
      setTimeout(() => {
        setDeleteRes(initDeleteRes);
      }, 3000);
      return;
    }

    setBtnLoading3(false);

    const data = {
      isbns: [deleteISBN]
    }

    api
      .deleteCip(data)
      .then(res => {
        setBtnLoading3(false);
        if(res.status === 200) {
          if(res.data.codes[0] === 28) {
            setDeleteISBN("");
          }
          setDeleteRes(res.data);
          setTimeout(() => {
            setDeleteRes(initDeleteRes);
          }, 3000);
        }
      })
      .catch(error => {
        setBtnLoading3(false);
        setDeleteRes({
          codes: [26],
          message: '删除失败...'
        });
        setTimeout(() => {
          setDeleteRes(initDeleteRes);
        }, 3000);
      })
  }

  // add book
  const handleInputChange4 = (e, v) => {
    if(v.id === 'isbn1') {
      setAddBook({
        ...addBook,
        isbn: v.value
      })
    } else {
      setAddBook({
        ...addBook,
        [v.id]: v.value
      });
    }
    setAddBookError(initAddBookError);
  }

  const handleFormSubmit4 = (e) => {
    e.preventDefault();

    for(let item in addBookError) {
      if(addBook[item] === "") {
        setAddBookError({
          ...addBookError,
          [item]: true
        });
        return;
      }
    }

    setBtnLoading4(true);

    const temp = addBook;
    temp.mid = user.id;
    const data = [temp];

    api
      .addBook(data)
      .then(res => {
        setBtnLoading4(false);
        if(res.status === 200) {
          if(res.data.codes[0] === 34) {
            setAddBook(initAddBook);
          }
          setAddBookRes(res.data);
          setTimeout(() => {
            setAddBookRes(initAddBookRes);
          }, 3000);
        }
      })
      .catch(error => {
        setBtnLoading4(false);
        setAddBookRes({
          codes: [31],
          message: '添加失败...'
        });
        setTimeout(() => {
          setAddBookRes(initAddBookRes);
        }, 3000);
      })
  }

  // delete book
  const handleInputChange5 = (e, v) => {
    setDeleteBook(v.value);
    setDeleteBookRes(initDeleteBookRes);
  }

  const handleFormSubmit5 = (e) => {
    e.preventDefault();

    if(!deleteBook) {
      setDeleteBookRes({
        codes: [35],
        message: '请填写要删除图书信息！'
      });
      return;
    }

    setBtnLoading5(true);

    const data = {
      bookIds: [deleteBook]
    };

    api
      .deleteBook(data)
      .then(res => {
        setBtnLoading5(false);
        if(res.status === 200) {
          if(res.data.codes[0] === 38) {
            setDeleteBook("");
          }
          setDeleteBookRes(res.data);
          setTimeout(() => {
            setDeleteBookRes(initDeleteBookRes);
          }, 3000);
        }
      })
      .catch(error => {
        setBtnLoading5(false);
        setDeleteBookRes({
          codes: [35],
          message: '删除失败...'
        });
        setTimeout(() => {
          setDeleteBookRes(initDeleteBookRes);
        }, 3000);
      })
  }

  return (
    <div className="home container">
      <aside className="side-menu">
        <ul className="home-list">
          <li><a href="#query">查询书目信息</a></li>
          <li><a href="#add-cip">录入书目信息</a></li>
          <li><a href="#delete-cip">删除书目信息</a></li>
          <li><a href="#add-book">录入图书信息</a></li>
          <li><a href="#delete-book">删除图书信息</a></li>
        </ul>
      </aside>
      <main>
        <section id="query">
          <h2>查询书目信息</h2>
          <form onSubmit={handleFormSubmit1} className="form">
            <div className="input-group">
              <p>请输入要查询的书目信息：</p>
              <Input
                id="queryISBN"
                fluid
                value={queryISBN}
                className="form-input"
                onChange={handleInputChange1}
              />
            </div>

            { queryRes.code === 21 ? (
              <Message success>本馆不存在该书目信息，可以添加！</Message>
            ) : null }
            { queryRes.code === 20 ? (
              <Message error>
              { queryRes.message ? (
                <p>{ queryRes.message }</p>
              ) : (
                <p>本馆已存在该书目信息</p>
              ) }</Message>
            ) : null }

            <Button
              loading={btnLoading1}
              onClick={handleFormSubmit1}
            >查询</Button>
          </form>
        </section>

        <section id="add">
          <h2>录入书目信息</h2>
          <form onSubmit={handleFormSubmit2} className="form">
            <div className="input-group">
              <p>ISBN：</p>
              <Input
                fluid
                id="isbn"
                typr="text"
                value={addInfo.isbn}
                error={addError.isbn}
                className="form-input"
                onChange={handleInputChange2}
              />
            </div>
            <div className="input-group">
              <p>书目名称：</p>
              <Input
                fluid
                id="name"
                type="text"
                value={addInfo.name}
                error={addError.name}
                className="form-input"
                onChange={handleInputChange2}
              />
            </div>
            <div className="input-group">
              <p>作者：</p>
              <Input
                fluid
                id="writer"
                type="text"
                className="form-input"
                value={addInfo.writer}
                error={addError.writer}
                onChange={handleInputChange2}
              />
            </div>
            <div className="input-group">
              <p>所属出版社：</p>
              <Input
                fluid
                id="pub"
                type="text"
                value={addInfo.pub}
                error={addError.pub}
                className="form-input"
                onChange={handleInputChange2}
              />
            </div>
            <div className="input-group">
              <p>出版日期：</p>
              <Input
                fluid
                id="date"
                type="text"
                value={addInfo.date}
                error={addError.date}
                className="form-input"
                onChange={handleInputChange2}
              />
            </div>

            { addRes.code === 23 ? (
              <Message success>添加成功！</Message>
            ) : null }
            { addRes.code === 22 ? (
              <Message error>
              { addRes.message ? (
                <p>{ addRes.message }</p>
              ) : (
                <p>本馆已存在该书目信息，添加失败！</p>
              ) }</Message>
            ) : null }

            <Button
              loading={btnLoading2}
              onClick={handleFormSubmit2}
            >添加书目</Button>
          </form>
        </section>

        <section id="delete-cip">
          <h2>删除书目信息</h2>
          <form className="form" onSubmit={handleFormSubmit3}>
            <div className="input-group">
              <p>请输入要删除的书目 ISBN：</p>
              <Input
                fluid
                value={deleteISBN}
                className="form-input"
                onChange={handleInputChange3}
              />
            </div>

            { deleteRes.codes[0] === 26 ? (
              <Message error>
              { deleteRes.message ? (
                <p>{ deleteRes.message }</p>
              ) : (
                <p>删除失败，本馆不存在此 ISBN 书目</p>
              ) }</Message>
            ) : null }
            { deleteRes.codes[0] === 27 ? (
              <Message error>删除失败，本书目下还有对应图书</Message>
            ) : null }
            { deleteRes.codes[0] === 28 ? (
              <Message success>删除成功</Message>
            ) : null }

            <Button
              loading={btnLoading3}
              onClick={handleFormSubmit3}
            >删除</Button>
          </form>
        </section>

        <section id="add-book">
          <h2>录入图书信息</h2>
          <form
            className="form"
            onSubmit={handleFormSubmit4}
          >
            <div className="input-group">
              <p>图书 ID：</p>
              <Input
                fluid
                id="id"
                type="text"
                value={addBook.id}
                error={addBookError.id}
                className="form-input"
                onChange={handleInputChange4}
              />
            </div>
            <div className="input-group">
              <p>图书所属书目 ISBN：</p>
              <Input
                fluid
                id="isbn1"
                type="text"
                value={addBook.isbn}
                error={addBookError.isbn}
                className="form-input"
                onChange={handleInputChange4}
              />
            </div>
            <div className="input-group">
              <p>图书位置：</p>
              <Select
                fluid
                id="address"
                value={addBook.address}
                options={selectList}
                className="form-input"
                onChange={handleInputChange4}
              />
            </div>

            { addBookRes.codes[0] === 31 ? (
              <Message error>
              { addBookRes.message ? (
                <p>{ addBookRes.message }</p>
              ) : (
                <p>添加失败，该图书的 ID 已存在</p>
              ) }</Message>
            ) : null }
            { addBookRes.codes[0] === 32 ? (
              <Message error>添加失败，该图书所属书目不存在</Message>
            ) : null }
            { addBookRes.codes[0] === 33 ? (
              <Message error>添加失败...</Message>
            ) : null }
            { addBookRes.codes[0] === 34 ? (
              <Message success>添加成功</Message>
            ) : null }

            <Button
              loading={btnLoading4}
              onClick={handleFormSubmit4}
            >添加图书</Button>
          </form>
        </section>

        <section id="delete-book">
          <h2>删除图书信息</h2>
          <form className="form" onSubmit={handleFormSubmit5}>
            <div className="input-group">
              <p>请输入要删除的图书 ID：</p>
              <Input
                fluid
                value={deleteBook}
                className="form-input"
                onChange={handleInputChange5}
              />
            </div>

            { deleteBookRes.codes[0] === 35 ? (
              <Message error>
              { deleteRes.message ? (
                <p>{ deleteRes.message }</p>
              ) : (
                <p>删除失败，本馆不存在此图书</p>
              ) }</Message>
            ) : null }
            { deleteBookRes.codes[0] ===36 ? (
              <Message error>删除失败，本图书正在外借</Message>
            ) : null }
            { deleteBookRes.codes[0] ===37 ? (
              <Message error>删除失败...</Message>
            ) : null }
            { deleteBookRes.codes[0] === 38 ? (
              <Message success>删除成功</Message>
            ) : null }

            <Button
              loading={btnLoading5}
              onClick={handleFormSubmit5}
            >删除</Button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Home;
