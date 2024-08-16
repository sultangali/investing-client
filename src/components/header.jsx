import React from 'react'
import {Navbar, Nav, Dropdown, Container, Button} from 'react-bootstrap'
import { RecordCircle } from 'react-bootstrap-icons'
import i18n from '../i18n.js';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";

import { selectIsAuth, logout, fetchAuthMe } from "../redux/slices/user.js";

const Header = ({onDataChange, isShort}) => {

  const isAuth =useSelector(selectIsAuth);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  },[dispatch])

  const userData = useSelector((state) => state.user.data);

  const onClickLogout = () => {
    dispatch(logout());
  window.localStorage.removeItem("token");
  };

  console.log(userData && userData)

  const [currentYear, setCurrentYear] = React.useState(2024)
  const [currentTime, setCurrentTime] = React.useState('live')
  const [currentLanguage, setCurrentLanguage] = React.useState('kaz')

  const {t} = useTranslation()

  const years = []

  let currYear = currentYear

  for (let y = 2024; y >= 1995; y--) {
    years.push(y)
  }
  React.useEffect(() => {
    // Например, после изменения данных можно передать новое значение родителю
    onDataChange({
      year: currentYear,
      time: currentTime,
      language: currentLanguage
    });
  }, [currentYear, currentTime, currentLanguage, onDataChange]);

  const switchLangTitle = (language) => {
    let output = ''
    switch(language) {
      case 'kaz': 
        output = 'Тілді таңдаңыз'
        break
      case 'rus':
        output =  'Выберите язык'
        break
      case 'eng':
        output =  'Choose language'
        break
      default:
        output =  'Тілді таңдаңыз'
        break
    }
    return output
  }

  return (<>
  <Navbar expand="lg" className="bg-body-tertiary shadow" style={{height: '80px'}} >
      <Container>
        <Navbar.Brand href="/investing" className='brand'>INVESTING PLATFORM</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-3 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll>
            <Nav.Link href='/calendars'>{t('calendar')}</Nav.Link>
            <Nav.Link href='/instruments'>{t('instruments')}</Nav.Link>
            <Nav.Link href='/news'>{t('news')}</Nav.Link>
          </Nav>

          <Dropdown>
            <Dropdown.Toggle className='language-switch-btn' variant="light"  id="dropdown-basic">
              {switchLangTitle(currentLanguage)}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => {setCurrentLanguage('kaz'); i18n.changeLanguage('kaz');}}>Қазақша</Dropdown.Item>
              <Dropdown.Item onClick={() => {setCurrentLanguage('rus'); i18n.changeLanguage('rus');}}>Русский</Dropdown.Item>
              <Dropdown.Item onClick={() => {setCurrentLanguage('eng'); i18n.changeLanguage('eng')}}>English</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {
            isAuth ? <>
            <span style={{margin: 'auto 24px auto 10px'}}>{userData?.email}</span>
            <Button className='signin-btn' onClick={() => onClickLogout()}>{t('logout')}</Button>
            </> :
            <>
            <Button className='signin-btn' href='/login'>{t('signin')}</Button>
            <Button className='signup-btn' href='/registration'>{t('signup')}</Button>
            </>
          }
            
          
        </Navbar.Collapse>
      </Container>
  </Navbar>
      {/* <Container> */}
      { isShort ? <></> :
        <Navbar expand="lg" className="" style={{backgroundColor: '#4362eec0', height: '54px'}} >
      <Container>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-3 my-lg-0">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{borderRadius: '1px', border: '1px solid ', backgroundColor: '#4361ee', color: 'white' }}>
            {currentYear} &nbsp;
            </Dropdown.Toggle>

            <Dropdown.Menu>{
                years?.map((year, i) => (
                  <Dropdown.Item key={i + 1} onClick={() => { setCurrentYear(year) }} >{year}</Dropdown.Item>
                ))
              }
            </Dropdown.Menu>
          </Dropdown>
          </Nav>
          <Button className='switch-btn' onClick={() => {setCurrentTime('15sec'); setCurrentYear(currYear)}}>{t('15sec')}</Button>
          <Button className='switch-btn' onClick={() => {setCurrentTime('1min'); setCurrentYear(currYear)}}>{t('1min')}</Button>
          <Button className='switch-btn' onClick={() => {setCurrentTime('1hour'); setCurrentYear(currYear)}}>{t('1hour')}</Button>
          <Button className='switch-btn' onClick={() => {setCurrentTime('1day'); setCurrentYear(currYear) }}>{t('1day')}</Button>
          <Button className='switch-btn' onClick={() => {setCurrentTime('1week'); setCurrentYear(currYear)}}>{t('1week')}</Button>
          <Button className='switch-btn' onClick={() => {setCurrentTime('1month'); setCurrentYear(currYear)}}>{t('1month')}</Button>
          <Button className='switch-btn' onClick={() => {setCurrentTime('3month');setCurrentYear(currYear) }}>{t('3month')}</Button>
          <Button className='switch-btn' onClick={() => {setCurrentTime('6month'); setCurrentYear(currYear)}}>{t('6month')}</Button>
          <Button className='switch-btn' onClick={() => {setCurrentTime('1year'); setCurrentYear(currYear)}}>{t('1year')}</Button>
          <Button className='switch-btn live-btn' onClick={() => {setCurrentTime('live');setCurrentYear(currYear) }}>{t('live')}&nbsp; <RecordCircle/></Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>}
      {/* </Container> */}

    </>)
}

export default Header