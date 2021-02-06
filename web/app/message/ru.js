'use strict';
/**
 * Extend default translations
 *
 * Use: Jam.t('Some text')
 * Use: <span data-t="">Some text</span>
 * Use: <div title="Some text" data-t=""></div>
 * Use: <input placeholder="Some text" type="text" data-t="">
 */
Object.assign(Jam.I18n.defaults, {

});

/**
 * Define custom translation category
 *
 * Use: Jam.t('Some text', 'custom')
 * Use: <span data-t="custom">Some text</span>
 * Use: <div title="Some text" data-t="custom"></div>
 * Use: <input placeholder="Some text" type="text" data-t="custom">
 * Use: <div title="Some text" data-t-title="custom" data-t="">Text</div>
 */
Jam.I18n.custom = {

    'Some text': 'Некоторый текст'
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