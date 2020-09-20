import React, { useEffect, useState } from 'react';
import CategoryItem from './components/CategoryItem';
import TaskList from './components/TaskList';
import { useDispatch, useSelector } from 'react-redux';

import { fetchList, postList } from './redux/actions/list';
import { fetchTask } from './redux/actions/task';
import { fetchColor } from './redux/actions/color';

import { Color, List, Task } from './redux/actionTypes';
import { RootState } from './redux/reducers/rootReducer';

import './app.scss';

const App: React.FC = () => {
  const [popupState, setPopupState] = useState<boolean>(false);
  const [activeColor, setActiveColor] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>('');

  const dispatch = useDispatch();
  const lists: List[] = useSelector((state: RootState) => state.list.lists);
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const colors: Color[] = useSelector((state: RootState) => state.color.colors);

  useEffect(() => {
    dispatch(fetchList);
    dispatch(fetchTask);
    dispatch(fetchColor);
  }, [dispatch]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function addListFunc(text: string, colorId: number): void {
    if (text.trim() === '') {
      alert('Введите название папки');
    } else {
      postList(dispatch, text, colorId);
      setInputValue('');
      setActiveColor(1);
      setPopupState(false);
    }
  }

  function renderTaskList(lists: List[], active: boolean): any {
    return lists.map((list) => {
      return (
        <TaskList
          active={active}
          color={colors.filter((color) => color.id === list.colorId)}
          key={list.id}
          listId={list.id}
          tasks={tasks.filter(
            (task: Task) =>
              task.listId === list.id &&
              task.text.toLowerCase().includes(searchInput.toLowerCase())
          )}>
          {list.name}
        </TaskList>
      );
    });
  }

  return (
    <div className='todo'>
      <div className='todo__list'>
        {lists && lists.length !== 0 ? (
          <h2
            onClick={() => setActiveCategory(0)}
            className={`todo__list-title todo__list-title_${
              activeCategory === 0 && 'active'
            }`}>
            <svg
              width='28'
              height='28'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z'
                fill='#7C7C7C'
              />
            </svg>
            Все задачи
          </h2>
        ) : (
          ''
        )}

        <ul className='todo__list-items'>
          {lists &&
            lists.map(({ name, colorId, id }, index) => {
              return (
                <CategoryItem
                  activeCat={id === activeCategory}
                  setActiveCategoryFunc={() => setActiveCategory(id)}
                  color={colors.filter((color) => color.id === colorId)}
                  key={index}
                  id={id}
                  categoryLength={tasks.reduce((number: number, task: Task) => {
                    task.listId === id && number++;
                    return number;
                  }, 0)}>
                  {name}
                </CategoryItem>
              );
            })}
        </ul>

        <button
          onClick={() => setPopupState(!popupState)}
          className='btn btn__new-folder'>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M6 1V11'
              stroke='#868686'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M1 6H11'
              stroke='#868686'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          Добавить папку
        </button>

        <form
          name='new-folder'
          className={`new-folder ${popupState ? 'new-folder_open' : ''}`}>
          <div
            onClick={() => setPopupState(!popupState)}
            className='btn btn__close'>
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6.24741 5L9.73899 1.50842C9.9047 1.343 9.99791 1.11853 9.99812 0.884393C9.99832 0.650251 9.90551 0.425617 9.74009 0.259907C9.57468 0.0941973 9.35021 0.000986589 9.11606 0.000779811C8.88192 0.000573033 8.65729 0.0933872 8.49158 0.258804L5 3.75038L1.50842 0.258804C1.34271 0.0930948 1.11796 0 0.883613 0C0.649264 0 0.424514 0.0930948 0.258804 0.258804C0.0930948 0.424514 0 0.649264 0 0.883613C0 1.11796 0.0930948 1.34271 0.258804 1.50842L3.75038 5L0.258804 8.49158C0.0930948 8.65729 0 8.88204 0 9.11639C0 9.35074 0.0930948 9.57549 0.258804 9.7412C0.424514 9.90691 0.649264 10 0.883613 10C1.11796 10 1.34271 9.90691 1.50842 9.7412L5 6.24962L8.49158 9.7412C8.65729 9.90691 8.88204 10 9.11639 10C9.35074 10 9.57549 9.90691 9.7412 9.7412C9.90691 9.57549 10 9.35074 10 9.11639C10 8.88204 9.90691 8.65729 9.7412 8.49158L6.24741 5Z'
                fill='#E3E3E3'
              />
            </svg>
          </div>
          <input
            onChange={handleChange.bind(this)}
            value={inputValue}
            className='input input__new-folder'
            placeholder='Название папки'
            type='text'
          />
          <div className='new-folder__color-list'>
            {colors.map((color, index) => {
              return (
                <div
                  onClick={() => setActiveColor(color.id)}
                  key={index}
                  className={`badge badge-${color.name} ${
                    activeColor === color.id && 'badge_active'
                  }`}></div>
              );
            })}
          </div>
          <div
            onClick={addListFunc.bind(this, inputValue, activeColor)}
            className='btn btn__add'>
            Добавить
          </div>
        </form>
      </div>

      <div className='todo__tasks'>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          type='text'
          className='todo__input'
          placeholder='Поиск...'
        />
        {lists.length > 0 ? (
          activeCategory === 0 ? (
            renderTaskList(lists, false)
          ) : (
            renderTaskList(
              lists.filter((list) => list.id === activeCategory),
              true
            )
          )
        ) : (
          <p className='todo__empty'>Задачи отсутствуют</p>
        )}
      </div>
    </div>
  );
};

export default App;
