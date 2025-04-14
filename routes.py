from flask import Blueprint, jsonify, request
from . import db
from .models import Project, Timer  
from datetime import datetime 

api = Blueprint('api', __name__)

#Project Routes
@api.route('/projects', methods =['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])

@api.route('/projects', methods=['POST'])
def create_project():
    data = request.json
    project = Project(name = data['name'])
    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict()), 201


@api.route('/projects/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    print(f"🧹 Attempting to delete project {project_id}")

    project = Project.query.get_or_404(project_id)
    
    print(f"✅ Found project: {project.name}")
    print(f"🧨 Related timers: {project.timers}")  # helpful debug

    db.session.delete(project)

    try:
        db.session.commit()
        print(f"✅ Project {project_id} deleted.")
        return jsonify({'message': 'Project deleted'}), 200
    except Exception as e:
        print(f"❌ Error during deletion: {e}")
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


#Timer Routes
@api.route('/timers/<int:project_id>', methods=['GET'])
def get_timers_for_project(project_id):
    timers = Timer.query.filter_by(project_id=project_id).all()
    return jsonify([t.to_dict() for t in timers])


@api.route('/timers', methods = ['POST'])
def post_timer():
    data = request.json
    timer = Timer(project_id = data['project_id'],  
              duration_minutes = data['duration_minutes'],
              completed = data.get('completed', False))
    db.session.add(timer)
    db.session.commit()
    return jsonify(timer.to_dict()), 201



