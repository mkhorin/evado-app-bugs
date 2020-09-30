'use strict';

// evado/web/jam/utility/I18n.js

// extend default translation category
// use: <span data-t="">Some text</span>
// use: <div title="Some text"></div>
// use: <input placeholder="Some text" type="text" />

Object.assign(Jam.I18n.defaults, {

});

// define custom translation category
// use: <span data-t="custom">Any text</span>
// use: <div data-t="custom" title="Any text"></div>
// use: <input data-t="custom" placeholder="Any text" type="text"/>
// use: <div data-t-title="customTitle" title="Any title" data-t="custom">Any text</div>

Jam.I18n.custom = {

    'Any text': 'Любой текст'
};

Jam.I18n.customTitle = {

    'Any title': 'Любой заголовок'
};

// METADATA

Jam.I18n.meta = {

    'All tasks': 'Все задачи',
    'Assigned tasks': 'Назначенные задачи',
    'Assigned to me': 'Назначенные мне',
    'Assignee': 'Назначенный исполнитель',
    'Author': 'Автор',
    'Average': 'Средний',

    'Close': 'Закрыть',
    'Closed': 'Закрыто',
    'Comment': 'Комментарий',
    'Comments': 'Комментарии',
    'Complete': 'Завершить',
    'Created at': 'Создано',
    'Created by me': 'Создано мной',
    'Created tasks': 'Созданные задачи',
    'Critical': 'Критический',

    'Defect is not fixed': 'Дефект не исправлен',
    'Description': 'Описание',
    'Document': 'Документ',
    'Documents': 'Документы',
    'Done': 'Сделано',
    'Duration': 'Длительность',

    'Employee': 'Сотрудник',
    'Employees': 'Сотрудники',
    'Executor': 'Исполнитель',

    'File': 'Файл',

    'High': 'Высокий',
    'Hours spent': 'Потрачено часов',

    'In progress': 'В процессе выполнения',

    'Low': 'Низкий',

    'Manager': 'Менеджер',
    'My employee': 'Мой сотрудник',

    'Name': 'Название',
    'New': 'Новое',
    'New tasks': 'Новые задачи',

    'Priority': 'Приоритет',
    'Project': 'Проект',
    'Projects': 'Проекты',
    'Put the task on pending review': 'Отправить задачу на проверку',

    'Reject': 'Отклонить',
    'Reopen': 'Переоткрыть',

    'Start working': 'Начать работу',
    'State': 'Состояние',
    'Stop working': 'Остановить работу',
    'Summary': 'Заголовок',

    'Task': 'Задача',
    'Tasks': 'Задачи',
    'Text': 'Текст',
    'Total time of all work on the task': 'Суммарное время работ над задачей',

    'User': 'Пользователь',

    'Work': 'Работа',
    'Work log': 'Журнал работ',
    'Works': 'Работы'
};