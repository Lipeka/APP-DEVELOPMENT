# users/decorators.py

from django.http import JsonResponse

def trainer_required(view_func):
    def _wrapped_view(request, *args, **kwargs):
        role = request.session.get('role')  # Or however you store the role after login
        if role != 'trainer':
            return JsonResponse({'error': 'Permission denied'}, status=403)
        return view_func(request, *args, **kwargs)
    return _wrapped_view
