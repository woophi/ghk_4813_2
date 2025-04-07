import { ButtonMobile } from '@alfalab/core-components/button/mobile';

import { Typography } from '@alfalab/core-components/typography';

import { Gap } from '@alfalab/core-components/gap';
import { Input } from '@alfalab/core-components/input';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import icon1 from './assets/icon1.png';
import icon2 from './assets/icon2.png';
import icon3 from './assets/icon3.png';
import image from './assets/image.png';
import smile from './assets/smile.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';

export const App = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deliveryType, setDeliveryType] = useState('По адресу');
  const [address, setAddress] = useState('');
  const [day, setDay] = useState('Сегодня');
  const [time, setTime] = useState('');
  const [isTimeError, setIsTimeError] = useState(false);
  const [details, setDetails] = useState('');
  const [thx, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));

  const submit = () => {
    setLoading(true);
    // sendDataToGA({
    //   destination: deliveryType,
    //   address: deliveryType === 'По адресу' ? address : '',
    //   delivery_date: deliveryType === 'По адресу' ? day : '',
    //   delivery_time: deliveryType === 'По адресу' ? time : '',
    //   comments: deliveryType === 'По адресу' ? details : '',
    // }).then(() => {
    //   setLoading(false);
    //   LS.setItem(LSKeys.ShowThx, true);
    // });
    setLoading(false);
    LS.setItem(LSKeys.ShowThx, true);
    setThx(true);
  };

  useEffect(() => {
    if (time !== '') {
      setIsTimeError(false);
    }
  }, [time]);

  if (thx) {
    return <ThxLayout />;
  }

  return (
    <>
      {step === 1 && (
        <div className={appSt.container}>
          <div className={appSt.box}>
            <img src={image} alt="Карта для ребенка" style={{ width: '85%', borderRadius: '16px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <Typography.Text tag="p" view="primary-medium" defaultMargins={false} weight="medium">
                  Кэшбэк до 30%
                </Typography.Text>
                <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                  Из 6 категорий на выбор
                </Typography.Text>
              </div>
              <div>
                <Typography.Text tag="p" view="primary-medium" defaultMargins={false} weight="medium">
                  Бесплатно
                </Typography.Text>
                <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                  Выпуск и обслуживание
                </Typography.Text>
              </div>
            </div>
          </div>

          <Gap size={48} />

          <Typography.TitleResponsive font="system" tag="h3" view="small" className={appSt.productsTitle}>
            Как это работает
          </Typography.TitleResponsive>

          <Gap size={16} />

          <div className={appSt.benefits}>
            <div className={appSt.benefit}>
              <img src={icon1} alt="" width={48} height={48} style={{ objectFit: 'cover' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                  Дебетовая карта
                </Typography.Text>
                <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                  Получайте суперкэшбэк рублями каждый месяц и бесплатно снимайте наличные в любых банкоматах
                </Typography.Text>
              </div>
            </div>
            <div className={appSt.benefit}>
              <img src={icon2} alt="" width={48} height={48} style={{ objectFit: 'cover' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                  Категории с повышенным
                </Typography.Text>
                <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                  Продукты, маркетплейсы, такси и многое другое. А ещё можно выбрать кэшбэк на всё и получать выгоду всегда
                </Typography.Text>
              </div>
            </div>
            <div className={appSt.benefit}>
              <img src={icon3} alt="" width={48} height={48} style={{ objectFit: 'cover' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                  Крутите барабан суперкэшбэка
                </Typography.Text>
                <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                  Дадим 40, 60, 80 и даже 100% кэшбэка на случайную категорию или увеличим процент на выбранную категорию
                </Typography.Text>
              </div>
            </div>
          </div>

          <Gap size={24} />
        </div>
      )}

      {step === 2 && (
        <div className={appSt.container}>
          <Gap size={32} />
          <Typography.TitleResponsive font="system" tag="h3" view="small" className={appSt.productsTitle}>
            Детали доставки
          </Typography.TitleResponsive>

          <Gap size={28} />

          <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
            <SwiperSlide
              onClick={() => setDeliveryType('По адресу')}
              className={appSt.swSlide({
                selected: deliveryType === 'По адресу',
              })}
            >
              <span>По адресу</span>
              <span>Бесплатно</span>
            </SwiperSlide>
            <SwiperSlide
              onClick={() => setDeliveryType('В офис банка')}
              className={appSt.swSlide({
                selected: deliveryType === 'В офис банка',
              })}
            >
              <span>В офис банка</span>
              <span>Бесплатно</span>
            </SwiperSlide>
          </Swiper>

          <Gap size={24} />

          <>
            {deliveryType === 'По адресу' && (
              <>
                <Input
                  placeholder="Проспект Ленина, 12, кв 24"
                  block={true}
                  labelView={'inner'}
                  size={48}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />

                <Gap size={48} />

                <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
                  Дата и время
                </Typography.Text>

                <Gap size={24} />

                <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
                  <SwiperSlide
                    onClick={() => {
                      setDay('Сегодня');
                      setTime('');
                    }}
                    className={appSt.swSlideOneLine({
                      selected: day === 'Сегодня',
                    })}
                  >
                    Сегодня
                  </SwiperSlide>
                  <SwiperSlide
                    onClick={() => {
                      setDay('Завтра');
                      setTime('');
                    }}
                    className={appSt.swSlideOneLine({
                      selected: day === 'Завтра',
                    })}
                  >
                    Завтра
                  </SwiperSlide>
                  <SwiperSlide
                    onClick={() => {
                      setDay('Послезавтра');
                      setTime('');
                    }}
                    className={appSt.swSlideOneLine({
                      selected: day === 'Послезавтра',
                    })}
                  >
                    Послезавтра
                  </SwiperSlide>
                </Swiper>

                <Gap size={24} />

                {day === 'Сегодня' && (
                  <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
                    <SwiperSlide
                      onClick={() => setTime('Через 4 часа')}
                      className={appSt.swSlideOneLine({
                        selected: time === 'Через 4 часа',
                      })}
                    >
                      Через 4 часа
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('Через 6 часов')}
                      className={appSt.swSlideOneLine({
                        selected: time === 'Через 6 часов',
                      })}
                    >
                      Через 6 часа
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('Через 8 часов')}
                      className={appSt.swSlideOneLine({
                        selected: time === 'Через 8 часов',
                      })}
                    >
                      Через 8 часов
                    </SwiperSlide>
                  </Swiper>
                )}

                {day === 'Завтра' && (
                  <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
                    <SwiperSlide
                      onClick={() => setTime('10:00—12:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '10:00—12:00',
                      })}
                    >
                      10:00—12:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('12:00—14:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '12:00—14:00',
                      })}
                    >
                      12:00—14:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('14:00—16:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '14:00—16:00',
                      })}
                    >
                      14:00—16:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('16:00—18:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '16:00—18:00',
                      })}
                    >
                      16:00—18:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('18:00—20:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '18:00—20:00',
                      })}
                    >
                      18:00—20:00
                    </SwiperSlide>
                  </Swiper>
                )}

                {day === 'Послезавтра' && (
                  <Swiper style={{ marginLeft: '0' }} spaceBetween={8} slidesPerView="auto">
                    <SwiperSlide
                      onClick={() => setTime('10:00—12:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '10:00—12:00',
                      })}
                    >
                      10:00—12:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('12:00—14:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '12:00—14:00',
                      })}
                    >
                      12:00—14:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('14:00—16:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '14:00—16:00',
                      })}
                    >
                      14:00—16:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('16:00—18:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '16:00—18:00',
                      })}
                    >
                      16:00—18:00
                    </SwiperSlide>
                    <SwiperSlide
                      onClick={() => setTime('18:00—20:00')}
                      className={appSt.swSlideOneLine({
                        selected: time === '18:00—20:00',
                      })}
                    >
                      18:00—20:00
                    </SwiperSlide>
                  </Swiper>
                )}

                {isTimeError && (
                  <>
                    <Gap size={8} />
                    <Typography.Text tag="p" view="primary-medium" color="negative" defaultMargins={false}>
                      Для заказа карты необходимо выбрать время доставки
                    </Typography.Text>
                  </>
                )}

                <Gap size={48} />

                <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
                  Детали и уточнения
                </Typography.Text>

                <Gap size={24} />

                <Input
                  placeholder="Комментарий сотруднику банка"
                  block={true}
                  labelView={'inner'}
                  size={48}
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                />
              </>
            )}
            {deliveryType === 'В офис банка' && (
              <div className={appSt.reminder}>
                <img src={smile} alt="" width={20} height={20} style={{ marginRight: '1rem' }} />
                <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                  Мы свяжемся с вами в ближайшее время для уточнения ближайшего офиса банка!
                </Typography.Text>
              </div>
            )}
          </>
        </div>
      )}

      <Gap size={96} />

      {step === 1 && (
        <div className={appSt.bottomBtnThx}>
          <ButtonMobile onClick={() => setStep(2)} block view="primary">
            Оформить за 0 ₽
          </ButtonMobile>
        </div>
      )}

      {step === 2 && (
        <div className={appSt.bottomBtnThx}>
          <ButtonMobile
            loading={loading}
            onClick={() => {
              if (!time && deliveryType === 'По адресу') {
                setIsTimeError(true);
              } else {
                submit();
              }
            }}
            block
            view="primary"
          >
            Оформить за 0 ₽
          </ButtonMobile>
        </div>
      )}
    </>
  );
};
