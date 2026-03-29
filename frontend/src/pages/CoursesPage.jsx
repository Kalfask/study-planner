import { useState, useEffect } from "react";
import api from "../api/axios";



function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    
    const [name, setName] = useState('');
    const [color, setColor] = useState('#7C6AFF');
    const [professor, setProfessor] = useState('');
    const [semester, setSemester] = useState('');

    const loadCourses = () =>
    {
        api.get('/courses').then(res => setCourses(res.data));
    }

    useEffect(()=>
    {
        loadCourses();
    }, []);

    const openCreateForm = () => {
        setEditingCourse(null);
        setName('');
        setColor("#7C6AFF");
        setProfessor('');
        setSemester('');
        setShowForm(true);
    };

    const openEditForm = (course) =>
    {
        setEditingCourse(course);
        setName(course.name);
        setColor(course.color || '#7C6AFF');
        setProfessor(course.professor || '');
        setSemester(course.semester || '');
        setShowForm(true);
    };

    const handleSave = async (e) => {
    
        e.preventDefault();
        const data = {name, color, professor, semester};

        if(editingCourse)
        {
            await api.put('/courses/' + editingCourse.id, data);
        }
        else
        {
            await api.post('/courses', data);
        }

        loadCourses();
        setShowForm(false);
    };

    const handleDelete = async (id) =>{
        if(window.confirm('Delete this course?'))
        {
            await api.delete('/courses/'+id);
            loadCourses();
        }
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24
            }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: 24 }}>Courses</h1>
                    <p style={{ color: '#8b8994', fontSize: 13, margin: '4px 0 0' }}>
                        {courses.length} courses
                    </p>
                </div>
                <button onClick={openCreateForm} style={btnStyle}>
                    + Add course
                </button>
            </div>

            {/* Form (shows when showForm is true) */}
            {showForm && (
                <form onSubmit={handleSave} style={formStyle}>
                    <h3 style={{ margin: '0 0 16px', fontSize: 16 }}>
                        {editingCourse ? 'Edit course' : 'New course'}
                    </h3>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Course name"
                            style={{ ...inputStyle, flex: 1 }}
                            required
                        />
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            style={{
                                width: 44, height: 40, border: '1px solid #2a2a36',
                                borderRadius: 8, background: '#0f0f12', cursor: 'pointer',
                                padding: 2
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                        <input
                            value={professor}
                            onChange={(e) => setProfessor(e.target.value)}
                            placeholder="Professor"
                            style={{ ...inputStyle, flex: 1 }}
                        />
                        <input
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            placeholder="Semester"
                            style={{ ...inputStyle, flex: 1 }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button type="submit" style={btnStyle}>
                            {editingCourse ? 'Update' : 'Create'}
                        </button>
                        <button type="button" onClick={() => setShowForm(false)}
                            style={btnCancelStyle}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Course cards grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 14
            }}>
                {courses.map(course => (
                    <div key={course.id} style={{
                        background: '#1a1a22',
                        border: '1px solid #2a2a36',
                        borderRadius: 14,
                        padding: 20,
                        borderTop: '3px solid ' + (course.color || '#7C6AFF')
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            marginBottom: 12
                        }}>
                            <div style={{
                                width: 10, height: 10, borderRadius: 3,
                                background: course.color || '#7C6AFF'
                            }} />
                            <div style={{ fontSize: 16, fontWeight: 600 }}>
                                {course.name}
                            </div>
                        </div>
                        {course.professor && (
                            <div style={{ fontSize: 12, color: '#8b8994', marginBottom: 4 }}>
                                {course.professor}
                            </div>
                        )}
                        {course.semester && (
                            <div style={{ fontSize: 11, color: '#5c5a66', marginBottom: 14 }}>
                                {course.semester}
                            </div>
                        )}
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => openEditForm(course)}
                                style={btnSmallStyle}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(course.id)}
                                style={{ ...btnSmallStyle, color: '#f5564a' }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const inputStyle = {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #2a2a36',
    background: '#0f0f12',
    color: '#e8e6e1',
    fontSize: 13,
    boxSizing: 'border-box'
};

const formStyle = {
    background: '#1a1a22',
    border: '1px solid #2a2a36',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20
};

const btnStyle = {
    padding: '8px 18px',
    background: '#7c6aff',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer'
};

const btnCancelStyle = {
    padding: '8px 18px',
    background: 'transparent',
    color: '#8b8994',
    border: '1px solid #2a2a36',
    borderRadius: 8,
    fontSize: 13,
    cursor: 'pointer'
};

const btnSmallStyle = {
    padding: '5px 12px',
    background: 'transparent',
    color: '#8b8994',
    border: '1px solid #2a2a36',
    borderRadius: 6,
    fontSize: 12,
    cursor: 'pointer'
};



export default CoursesPage;