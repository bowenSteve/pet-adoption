"""remove comments column

Revision ID: 15603da98e15
Revises: 5789a94e3fd2
Create Date: 2024-07-10 10:33:52.747863

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '15603da98e15'
down_revision = '5789a94e3fd2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('adoptions', 'comments')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('adoptions', sa.Column('comments', sa.VARCHAR(), nullable=True))
    # ### end Alembic commands ###
